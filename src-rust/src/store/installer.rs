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

#[tauri::command]
pub fn install_deb(package: String, window: tauri::Window) {
    thread::spawn(move || {
        let deb = uuid::Uuid::new_v4().to_string();
        Command::new("sh")
            .arg("-c")
            .arg(format!("curl -L -o /tmp/{} {}", deb, package))
            .output();

        let deb = uuid::Uuid::new_v4().to_string();
        Command::new("sh")
              .arg("-c")
              .arg(format!("dpkg-deb -xv {} /", deb))
              .output();

        window.emit("install_complete_deb", package);
    });
}