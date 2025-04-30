//! A WebAssembly module for analyzing browser extensions.
//! 
//! This module provides functionality to:
//! - Read and parse extension ZIP files
//! - Extract and analyze manifest.json
//! - Generate unique extension IDs
//! - Scan for URLs in extension files
//! 
//! The module is designed to be used from JavaScript through WebAssembly bindings.

use std::{collections::HashMap, io::{Cursor, Read, Seek, SeekFrom, Write}};
use serde_derive::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;
use zip::ZipArchive;
use regex::Regex;
use std::sync::LazyLock;
use md5;

/// Regular expression for matching URLs in extension files.
/// 
/// This regex matches HTTP, HTTPS, and FTP URLs with their full paths and query parameters.
static URL_REGEX: LazyLock<Regex> = LazyLock::new(|| {
    Regex::new(r"(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])").unwrap()
});

/// Represents an analysed file from the extension.
/// 
/// Contains information about a file found in the extension, including:
/// - The file's name
/// - Its path within the extension
/// - Any URLs found in its contents
#[derive(Serialize, Deserialize)]
pub struct AnalysedFile {
    /// The name of the file
    name: String,
    /// The full path of the file within the extension
    path: String,
    /// URLs found in the file's contents
    urls: Vec<String>,
}

#[wasm_bindgen]
// Maps Rust logging to JavaScript console.log.
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}

/// Represents a browser extension as a ZIP archive.
/// 
/// This struct provides methods to analyze the contents of a browser extension,
/// including reading its manifest and scanning for URLs in various file types.
#[wasm_bindgen]
pub struct Extension {
    /// The unique ID of the extension
    id: String,
    /// The ZIP archive containing the extension files
    archive: ZipArchive<Cursor<Vec<u8>>>,
}

#[wasm_bindgen]
impl Extension {
    /// Creates a new `Extension` instance from raw extension data.
    /// 
    /// # Arguments
    /// 
    /// * `data` - A byte slice containing the raw extension ZIP file data.
    ///     This is due to the fact that this library is compiled to WebAssembly,
    /// 
    /// # Returns
    /// 
    /// A new `Extension` instance or an error if the data cannot be parsed as a ZIP file
    #[wasm_bindgen(constructor)]
    pub fn new(data: &[u8]) -> Result<Extension, JsValue> {
        let mut c = Cursor::new(Vec::new());
        c.write_all(data).unwrap();
        c.seek(SeekFrom::Start(0)).unwrap();
        let mut archive = zip::ZipArchive::new(c).unwrap();

        let mut manifest_file = None;
        for i in 0..archive.len() {
            let mut file = archive.by_index(i).map_err(|e| e.to_string())?;
            if file.name() == "manifest.json" {
                let mut contents = String::new();
                file.read_to_string(&mut contents).map_err(|e| e.to_string())?;
                manifest_file = Some(contents);
                break;
            }
        }

        let manifest_contents = manifest_file.ok_or_else(|| JsValue::from_str("manifest.json not found in extension"))?;

        let hash = md5::compute(manifest_contents.as_bytes());
        let id = format!("{:x}", hash);

        Ok(Extension { id, archive })
    }

    /// Returns the unique ID of the extension.
    /// 
    /// # Returns
    /// 
    /// A string representing the unique ID of the extension.
    #[wasm_bindgen]
    pub fn get_id(&self) -> String {
        self.id.clone()
    }

    /// Analyses all files in the extension for URLs.
    /// 
    /// This method scans through all files in the extension, looking for URLs in:
    /// - JavaScript files (*.js)
    /// - JSON files (*.json)
    /// 
    /// # Returns
    /// 
    /// A JSON string containing a map of file paths to `AnalysedFile` objects,
    /// or an error if any file cannot be read or parsed.
    #[wasm_bindgen]
    pub fn analyse_files(&mut self) -> Result<String, JsValue> {
        let mut analysed_files = HashMap::new();

        for i in 0..self.archive.len() {
            let mut file = self.archive.by_index(i).map_err(|e| e.to_string())?;

            // we only care if it is a file or a syslink
            if file.is_dir() {
                continue;
            }

            let mut file_type = "unknown".to_string();

            let file_path = file.name().to_string();

            let file_name = file_path.split('/').last().unwrap_or("unknown").to_string();
            if file_name == "unknown" {
                continue;
            }

            let file_parts: Vec<&str> = file_path.split('.').collect();
            if file_parts.len() > 1 {
                let ext = file_parts.last().unwrap();
                match ext {
                    &"js" => file_type = "javascript".to_string(),
                    &"json" => file_type = "json".to_string(),
                    &"html" => file_type = "html".to_string(),
                    &"css" => file_type = "css".to_string(),
                    _ => {}
                }
            }

            let mut analysed_file = AnalysedFile {
                name: file_name,
                path: file_path,
                urls: Vec::new(),
            };

            match file_type.as_str() {
                "javascript" | "json" => {
                    let mut contents = String::new();
                    file.read_to_string(&mut contents).map_err(|e| e.to_string())?;

                    analysed_file.urls = URL_REGEX
                        .captures_iter(&contents)
                        .filter_map(|cap| cap.get(0))
                        .map(|m| m.as_str().to_string())
                        .collect();
                }
                _ => {continue;}
            }

            if analysed_file.urls.len() > 0 {
                analysed_files.insert(analysed_file.path.clone(), analysed_file);
            }
        }

        let result = serde_json::to_string(&analysed_files).map_err(|e| e.to_string())?;
        return Ok(result);
    }
}
