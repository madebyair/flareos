#![allow(warnings)]

mod utils {
    pub mod encryption;
}

mod apps {
    pub mod terminal;
}

mod wm {
    pub mod get_windows;
    pub mod activate;
}

use utils::encryption::encrypt;
use utils::encryption::decrypt;
use apps::terminal::{async_create_shell, async_write_to_pty, async_read_from_pty, async_resize_pty, TerminalState};
use tauri::{async_runtime::Mutex as AsyncMutex};
use std::io::BufReader;
use std::sync::Arc;
use portable_pty::PtySize;
use portable_pty::native_pty_system;
use wm::get_windows::get_windows;
use wm::activate::activate;

fn main() {
    let pty_system = native_pty_system();

    let pty_pair = pty_system
        .openpty(PtySize {
            rows: 24,
            cols: 80,
            pixel_width: 0,
            pixel_height: 0,
        })
        .unwrap();

    let reader = pty_pair.master.try_clone_reader().unwrap();
    let writer = pty_pair.master.take_writer().unwrap();

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .manage(TerminalState {
                    pty_pair: Arc::new(AsyncMutex::new(pty_pair)),
                    writer: Arc::new(AsyncMutex::new(writer)),
                    reader: Arc::new(AsyncMutex::new(BufReader::new(reader))),
                })
        .invoke_handler(tauri::generate_handler![
            encrypt, decrypt,
            async_create_shell, async_write_to_pty, async_read_from_pty, async_resize_pty,
            get_windows, activate
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
