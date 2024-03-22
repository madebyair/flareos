use std::process::Command;
use std::thread;
use tauri::Manager;

#[tauri::command]
pub fn install_snap(package: String, window: tauri::Window) {
    thread::spawn(move || {
        let _ = Command::new("sh")
            .arg("-c")
            .arg(format!("snap install {} --classic", package))
            .output();

        window.emit(format!("install_complete__{}", package).as_str(), "");
    });
}