use std::process::{Command, Stdio};
use serde_json::{json, Value};
use std::thread;
use tauri::async_runtime;

#[tauri::command]
pub async fn get_connected_devices() -> String {
    async_runtime::spawn(async move {
        let output = match Command::new("sh")
            .arg("-c")
            .arg("bluetoothctl devices Connected")
            .stdout(Stdio::piped())
            .stderr(Stdio::piped())
            .output() {
                Ok(output) => output,
                Err(_) => return String::new(),
            };

        if output.status.success() {
            let stdout = String::from_utf8_lossy(&output.stdout);
            let mut devices: Vec<Value> = Vec::new();
            for line in stdout.lines() {
                  let device_json = json!({
                       "device": line.trim()
                  });
                  devices.push(device_json);
            }
            serde_json::to_string(&devices).unwrap_or_else(|_| String::new())
        } else {
            String::new()
        }
    }).await.expect("reason lol")
}

#[tauri::command]
pub async fn get_paired_devices() -> String {
    async_runtime::spawn(async move {
        let output = match Command::new("sh")
            .arg("-c")
            .arg("bluetoothctl devices Paired")
            .stdout(Stdio::piped())
            .stderr(Stdio::piped())
            .output() {
                Ok(output) => output,
                Err(_) => return String::new(),
            };

        if output.status.success() {
            let stdout = String::from_utf8_lossy(&output.stdout);
            let mut devices: Vec<Value> = Vec::new();
            for line in stdout.lines() {
                  let device_json = json!({
                       "device": line.trim()
                  });
                  devices.push(device_json);
            }
            serde_json::to_string(&devices).unwrap_or_else(|_| String::new())
        } else {
            String::new()
        }
    }).await.expect("reason lol")
}

#[tauri::command]
pub async fn get_devices() -> String {
    async_runtime::spawn(async move {
        let output = match Command::new("sh")
            .arg("-c")
            .arg("bluetoothctl devices")
            .stdout(Stdio::piped())
            .stderr(Stdio::piped())
            .output() {
                Ok(output) => output,
                Err(_) => return String::new(),
            };

        if output.status.success() {
            let stdout = String::from_utf8_lossy(&output.stdout);
            let mut devices: Vec<Value> = Vec::new();
            for line in stdout.lines() {
                  let device_json = json!({
                       "device": line.trim()
                  });
                  devices.push(device_json);
            }
            serde_json::to_string(&devices).unwrap_or_else(|_| String::new())
        } else {
            String::new()
        }
    }).await.expect("reason lol")
}
