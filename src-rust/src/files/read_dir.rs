use std::{fs, path::PathBuf};
use serde_json::json;

#[derive(serde::Serialize)]
struct FilesEntry {
    path: PathBuf,
    is_dir: bool,
}

#[tauri::command]
pub fn read_dir(dir: String) -> String {
    let mut files = Vec::new();

    for entry in fs::read_dir(dir).unwrap() {
        let entry = entry.unwrap();
        let object = FilesEntry {
            path: entry.path(),
            is_dir: entry.metadata().unwrap().is_dir(),
        };
        files.push(object);
    }

    json!({
        "files": files
    }).to_string()
}
