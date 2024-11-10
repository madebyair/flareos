use std::process::Command;
use std::thread;

#[tauri::command]
pub fn set_current_sink(id: String, user: String) {
    thread::spawn(move || {
        Command::new("sh")
                 .arg("-c")
                 .arg(format!("sudo -u {} wpctl set-default {}", user, id))
                 .output()
                 .unwrap_or_else(|_| panic!("failed to execute wpctl"));
    });
}
