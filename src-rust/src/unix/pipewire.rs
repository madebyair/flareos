use std::process::Command;

#[tauri::command]
pub fn run_pipewire(name: String) {
    Command::new("sh")
            .arg("-c")
            .arg(format!("sudo -u {} systemctl --user start pipewire.service", name))
            .output()
            .expect("Failed to enable pipewire.service");

    Command::new("sh")
          .arg("-c")
          .arg(format!("sudo -u {} systemctl --user start wireplumber.service", name))
          .output()
          .expect("Failed to enable wireplumber.service");
}

#[tauri::command]
pub fn stop_pipewire(name: String) {
    Command::new("sh")
            .arg("-c")
            .arg(format!("sudo -u {} systemctl --user stop pipewire.service", name))
            .output()
            .expect("Failed to enable pipewire.service");

    Command::new("sh")
          .arg("-c")
          .arg(format!("sudo -u {} systemctl --user stop wireplumber.service", name))
          .output()
          .expect("Failed to enable wireplumber.service");
}