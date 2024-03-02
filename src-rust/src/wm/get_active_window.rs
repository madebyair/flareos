use std::process::Command;

#[tauri::command]
pub fn get_active_window() -> String {
    let command = Command::new("sh")
             .arg("-c")
             .arg("xdotool getwindowfocus getwindowname")
             .output()
             .unwrap_or_else(|_| panic!("failed to execute xdotool"));

    String::from_utf8(command.stdout).expect("got non UTF-8 data")
}
