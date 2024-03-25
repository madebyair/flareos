#![allow(warnings)]

mod utils {
    pub mod encryption;
}

mod apps {
    pub mod terminal;
    pub mod run_app;
}

mod wm {
    pub mod get_windows;
    pub mod activate;
    pub mod get_active_window;
    pub mod add_permissions;
}

mod icons {
    pub mod get_icon;
}

mod files {
    pub mod read_dir;
}

mod unix {
    pub mod create_user;
}

mod gamma {
    pub mod get_current_gamma;
    pub mod set_current_gamma;
}

mod store {
    pub mod download_icon;
    pub mod installer;
}

mod volume {
    pub mod get_current_volume;
    pub mod set_current_volume;
    pub mod list_sinks;
    pub mod set_current_sink;
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
use wm::get_active_window::get_active_window;
use icons::get_icon::get_icon;
use http::{header::*, response::Builder as ResponseBuilder, status::StatusCode};
use http_range::HttpRange;
use std::sync::Mutex;
use std::{
  io::{Read, Seek, SeekFrom, Write},
  path::PathBuf,
  process::{Command, Stdio},
};
use files::read_dir::read_dir;
use unix::create_user::create_user;
use nix::unistd::Uid;
use wm::add_permissions::add_permissions;
use gamma::get_current_gamma::get_current_gamma;
use gamma::set_current_gamma::set_current_gamma;
use store::download_icon::download_icon;
use store::installer::{install_snap, install_deb, uninstall_snap};
use apps::run_app::run_app;
use volume::get_current_volume::get_current_volume;
use volume::set_current_volume::set_current_volume;
use volume::list_sinks::list_sinks;
use volume::set_current_sink::set_current_sink;

fn main() {
    if !Uid::effective().is_root() {
        panic!("The Air Operating System Shell requires to be runned as root.");
    }

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

    let boundary_id = Arc::new(Mutex::new(0));

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
            get_windows, activate, get_active_window, add_permissions,
            read_dir,
            create_user,
            get_current_gamma, set_current_gamma,
            download_icon, install_snap, install_deb, uninstall_snap,
            run_app,
            get_current_volume, set_current_volume, list_sinks, set_current_sink
         ])
        .register_asynchronous_uri_scheme_protocol("icons", move |_app, request, responder| {
              match get_icon(request, &boundary_id) {
                Ok(http_response) => responder.respond(http_response),
                Err(e) => println!("Icons error {}", e)
              }
            })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
