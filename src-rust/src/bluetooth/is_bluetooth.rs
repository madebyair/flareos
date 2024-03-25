use std::fs;
use std::process::Command;

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

#[tauri::command]
pub fn get_bluetooth_adapter_status() -> String {
    let output = match Command::new("sh")
        .arg("-c")
        .arg("bluetoothctl show")
        .output() {
            Ok(output) => output,
            Err(_) => return "bluetoothctl error".to_string(),
        };

    if output.status.success() {
        let stdout = String::from_utf8_lossy(&output.stdout);
        if let Some(status_line) = stdout.lines().find(|line| line.contains("Powered:")) {
            let status = status_line.split(": ").nth(1).unwrap_or("n/a");
            return status.to_string();
        } else {
            return "Bluetooth is offline".to_string();
        }
    } else {
        return "Bluetoothctl is not installed".to_string();
    }
}