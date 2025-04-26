//! This file contains the Rust code for a WebAssembly module that reads a ZIP archive
//! and provides a function to list the files within it.

use std::io::{Cursor, Seek, SeekFrom, Write};
use wasm_bindgen::prelude::*;
use zip::ZipArchive;

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
    pub fn get_file_list(&mut self) -> Result<String, JsValue> {
        let mut file_list = Vec::new();

        for i in 0..self.archive.len() {
            let file = self.archive.by_index(i).map_err(|e| e.to_string())?;
            let file_name = file.name().to_string();
            let file_size = file.size();
            let compressed_size = file.compressed_size();
            let is_dir = file.is_dir();
            let last_modified = file
                .last_modified()
                .map(|dt| dt.to_string())
                .unwrap_or_else(|| "N/A".to_string());

            file_list.push((file_name, file_size, compressed_size, is_dir, last_modified));
        }

        let result = serde_json::to_string(&file_list).map_err(|e| e.to_string())?;
        return Ok(result);
    }
    
}
