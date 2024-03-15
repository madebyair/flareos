use std::process::Command;

#[tauri::command]
pub fn set_current_gamma(gamma: String) {
    Command::new("sh")
             .arg("-c")
             .arg(format!("for display in $(xrandr --listmonitors | awk '{{print $4}}'); do xrandr --output $display --gamma {}; done", gamma))
             .output()
             .unwrap_or_else(|_| panic!("failed to set gamma"));
}
