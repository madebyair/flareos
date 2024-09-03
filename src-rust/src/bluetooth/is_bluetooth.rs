use std::fs;
use std::process::Command;
use std::thread;
use std::sync::mpsc;

#[tauri::command]
pub fn is_bluetooth_adapter_available() -> bool {
    let bluetooth_path = "/sys/class/bluetooth";

    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        if let Ok(entries) = fs::read_dir(bluetooth_path) {
            for entry in entries {
                if let Ok(_) = entry {
                    tx.send(true).unwrap();
                    return;
                }
            }
        }
        tx.send(false).unwrap();
    });

    rx.recv().unwrap()
}

#[tauri::command]
pub fn get_bluetooth_adapter_status() -> String {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let output = match Command::new("sh")
            .arg("-c")
            .arg("bluetoothctl show")
            .output() {
                Ok(output) => output,
                Err(_) => {
                    tx.send("bluetoothctl error".to_string()).unwrap();
                    return;
                },
            };

        if output.status.success() {
            let stdout = String::from_utf8_lossy(&output.stdout);
            if let Some(status_line) = stdout.lines().find(|line| line.contains("Powered:")) {
                let status = status_line.split(": ").nth(1).unwrap_or("n/a");
                tx.send(status.to_string()).unwrap();
            } else {
                tx.send("Bluetooth is offline".to_string()).unwrap();
            }
        } else {
            tx.send("Bluetoothctl is not installed".to_string()).unwrap();
        }
    });

    rx.recv().unwrap()
}
