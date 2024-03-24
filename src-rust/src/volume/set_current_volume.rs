use std::process::Command;

#[tauri::command]
pub fn set_current_volume(volume: String) {
    Command::new("sh")
             .arg("-c")
             .arg(format!("XDG_RUNTIME_DIR=/run/user/1000 amixer -D pipewire sset Master {}", volume))
             .output()
             .unwrap_or_else(|_| panic!("failed to execute amixer"));
}
