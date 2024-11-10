use std::process::Command;
use std::thread;

#[tauri::command]
pub fn set_current_volume(volume: String, user: String) {
    thread::spawn(move || {
        Command::new("sh")
                 .arg("-c")
                 .arg(format!("sudo -u {} amixer sset Master {}", user, volume))
                 .output()
                 .unwrap_or_else(|_| panic!("failed to execute amixer"));
    });
}
