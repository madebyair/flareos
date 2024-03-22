use std::Command;

#[tauri::command]
pub fn download_icon(String icon) -> &str {
    let id = uuid::Uuid::new_v4();

    Command::new("sh").arg("-c").arg(format!("curl -O /usr/airos/icons/{}", id)).output()

    id
}