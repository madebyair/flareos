use std::process::Command;

#[tauri::command]
pub fn list_sinks() -> String {
    let command = Command::new("sh")
             .arg("-c")
             .arg("XDG_RUNTIME_DIR=/run/user/1000 pw-cli list-objects Node")
             .output()
             .unwrap_or_else(|_| panic!("failed to execute pw-cli"));

    String::from_utf8(command.stdout).expect("got non UTF-8 data")
}
