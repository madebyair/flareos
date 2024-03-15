use std::process::Command;

#[tauri::command]
pub fn get_current_gamma() -> String {
    let command = Command::new("sh")
             .arg("-c")
             .arg("xrandr --verbose | grep 'Gamma'")
             .output()
             .unwrap_or_else(|_| panic!("failed to execute xrandr"));

    String::from_utf8(command.stdout).expect("got non UTF-8 data")
}
