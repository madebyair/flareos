use std::fs;
use serde_json::Value;

#[tauri::command]
pub fn get_platform() -> String {
    let file = fs::read_to_string("/usr/airos/vendor/platform.json").unwrap();

    let v: Value = serde_json::from_str(&file).unwrap();

    v["platform"].to_string().replace("\"", "")
}