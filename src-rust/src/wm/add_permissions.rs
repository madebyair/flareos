use std::process::Command;

#[tauri::command]
pub fn add_permissions(user: String) {
    Command::new("sh")
             .arg("-c")
             .arg(format!("xhost +SI:localuser:{}", user))
             .output()
             .unwrap_or_else(|_| panic!("failed to execute xhost"));
}

#[tauri::command]
pub fn remove_permissions(user: String) {
    Command::new("sh")
             .arg("-c")
             .arg(format!("xhost -SI:localuser:{}", user))
             .output()
             .unwrap_or_else(|_| panic!("failed to execute xhost"));
}
