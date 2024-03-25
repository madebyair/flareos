use std::process::Command;

#[tauri::command]
pub fn set_current_sink(id: String) {
    Command::new("sh")
             .arg("-c")
             .arg(format!("XDG_RUNTIME_DIR=/run/user/1000 wpctl set-default {}", id))
             .output()
             .unwrap_or_else(|_| panic!("failed to execute wpctl"));
}
