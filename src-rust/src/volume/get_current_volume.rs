use std::process::Command;
use std::sync::mpsc;
use std::thread;

#[tauri::command]
pub fn get_current_volume(user: String) -> String {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let command_output = Command::new("sh")
            .arg("-c")
            .arg(format!(
                "sudo -u {} amixer get Master | grep -oP '\\d{{1,3}}%'",
                user
            ))
            .output()
            .expect("failed to execute amixer");

        let stdout = String::from_utf8(command_output.stdout)
            .expect("got non UTF-8 data");

        let result = stdout.replace(".", "").replace("\n", "");
        tx.send(result).unwrap();
    });

    rx.recv().unwrap()
}