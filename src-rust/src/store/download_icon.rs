use std::process::Command;

#[tauri::command]
pub fn download_icon(icon: String) -> String {
    let id = uuid::Uuid::new_v4().to_string();

    Command::new("sh").arg("-c").arg(format!("wget {} -O /usr/airos/icons/{}", icon, id)).output().unwrap();

    id
}