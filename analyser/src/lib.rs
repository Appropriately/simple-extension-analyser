//! This file contains the Rust code for a WebAssembly module that reads a ZIP archive
//! and provides a function to list the files within it.

use std::{collections::HashMap, io::{Cursor, Read, Seek, SeekFrom, Write}};
use serde_derive::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;
use zip::ZipArchive;
use regex::Regex;
use std::sync::LazyLock;

static URL_REGEX: LazyLock<Regex> = LazyLock::new(|| {
    Regex::new(r"(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])").unwrap()
});

#[derive(Serialize)] // Use serde to easily serialize to JSON
#[derive(Deserialize)]
pub struct AnalysedFile {
    name: String,
    path: String,
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

/// A struct representing an Extension, which is a ZIP archive.
/// 
/// This struct contains a `ZipArchive` object that allows us to read the contents of the ZIP file.
#[wasm_bindgen]
pub struct Extension {
    archive: ZipArchive<Cursor<Vec<u8>>>,
}

#[wasm_bindgen]
impl Extension {
    /// Creates a new `Extension` instance from a byte slice representing the ZIP file.

    #[wasm_bindgen(constructor)]
    pub fn new(data: &[u8]) -> Result<Extension, JsValue> {
        let mut c = Cursor::new(Vec::new());
        c.write_all(data).unwrap();
        c.seek(SeekFrom::Start(0)).unwrap();
        let archive = zip::ZipArchive::new(c).unwrap();
        Ok(Extension { archive })
    }

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
