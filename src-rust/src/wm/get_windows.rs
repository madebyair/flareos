use serde_json::json;
use serde::{Serialize};

#[derive(Serialize)]
struct Window {
    name: String,
    className: String
}

#[tauri::command]
pub fn get_windows() -> String {
    let windows = airos_wmctrl::get_windows();

    let mut window_vec = Vec::new();

    for window in windows {
        let cwindow = Window {
                name: window.title().to_string(),
                className: window.class().to_string()
        };
        window_vec.push(cwindow)
    }


    json!({
        "windows": window_vec
    }).to_string()
}
