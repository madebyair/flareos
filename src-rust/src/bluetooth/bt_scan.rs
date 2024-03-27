use std::process::Command;

#[tauri::command]
pub fn scan_on() {
    Command::new("sh")
                 .arg("-c")
                 .arg("bluetoothctl scan on")
                 .output()
                 .unwrap_or_else(|_| panic!("failed to execute bluetoothctl"));
}