use std::thread;
use std::process::Command;

#[tauri::command]
pub fn update_avatar(uuid: String) {
    thread::spawn(move || {
            let _ = Command::new("sh")
                .arg("-c")
                .arg(format!("wget https://api.made-by-air.com/avatar/{} -O /usr/flareos/avatars/{}", uuid, uuid))
                .output();
    });
}