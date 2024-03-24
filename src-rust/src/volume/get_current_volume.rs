use std::process::Command;

#[tauri::command]
pub fn get_current_volume() -> String {
    let command = Command::new("sh")
             .arg("-c")
             .arg("XDG_RUNTIME_DIR=/run/user/1000 amixer -D pipewire get Master | grep -oP '\\d{1,3}%'")
             .output()
             .unwrap_or_else(|_| panic!("failed to execute amixer"));

    let binding = String::from_utf8(command.stdout).expect("got non UTF-8 data");
    let arr: Vec<&str> = binding.split("\n").collect();
    arr[0].to_string()
}
