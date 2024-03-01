use std::process::Command;

#[tauri::command]
pub fn activate(class: String) {
    Command::new("sh")
             .arg("-c")
             .arg(format!("wmctrl -x -a {}", class))
             .output()
             .unwrap_or_else(|_| panic!("failed to execute 'wmctrl -x -a {}'", class));
}
