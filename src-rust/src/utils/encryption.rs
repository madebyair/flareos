use bcrypt::{DEFAULT_COST, hash, verify};


#[tauri::command]
pub fn encrypt(content: &str) -> String {
    hash(content, DEFAULT_COST).expect("Failed to encrypt")
}

#[tauri::command]
pub fn decrypt(content: &str, challenge: &str) -> bool {
    verify(content, challenge).expect("Failed to decrypt")
}