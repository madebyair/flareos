mod utils {
    pub mod encryption;
}

use utils::encryption::encrypt;
use utils::encryption::decrypt;


fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![encrypt, decrypt])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
