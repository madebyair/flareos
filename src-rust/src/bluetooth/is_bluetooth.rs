use std::fs;

#[tauri::command]
pub fn is_bluetooth_adapter_available() -> bool {
    let bluetooth_path = "/sys/class/bluetooth";

    if let Ok(entries) = fs::read_dir(bluetooth_path) {
        for entry in entries {
            if let Ok(_) = entry {
                return true;
            }
        }
    }

    false
}