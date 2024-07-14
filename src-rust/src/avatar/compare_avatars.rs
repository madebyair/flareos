#[tauri::command]
pub fn compare_avatars(avatar: String, current: String) -> bool {
    let path = format!("/usr/flareos/avatars/{}", avatar);
    let bytes = std::fs::read(path).unwrap();
    let hash = sha256::digest_bytes(&bytes);


    hash == current
}