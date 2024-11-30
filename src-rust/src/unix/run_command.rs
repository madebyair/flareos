use std::process::Command;

#[tauri::command]
pub fn run_command(command: String) -> String {
    let output = Command::new("sh")
        .arg("-c")
        .arg(command)
        .output()
        .expect("Failed to execute frontend requested command");

    if output.status.success() {
        String::from_utf8(output.stdout).unwrap_or_else(|_| "Invalid UTF-8 output".to_string())
    } else {
        String::from_utf8(output.stderr).unwrap_or_else(|_| "Invalid UTF-8 error output".to_string())
    }
}
