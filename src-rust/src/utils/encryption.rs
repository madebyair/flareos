use bcrypt::{hash, verify};


#[tauri::command]
pub fn encrypt(content: &str) -> String {
    hash(content, 4).expect("Failed to encrypt")
}

#[tauri::command]
pub fn decrypt(content: &str, challenge: &str) -> bool {
    verify(content, challenge).expect("Failed to decrypt")
}