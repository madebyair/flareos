use std::process::Command;

#[tauri::command]
pub fn activate(name: String) {
    Command::new("sh")
             .arg("-c")
             .arg(format!("wmctrl -a \"{}\"", name))
             .output()
             .unwrap_or_else(|_| panic!("failed to execute 'wmctrl -x -a {}'", name));
}
