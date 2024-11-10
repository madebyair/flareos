use std::process::Command;
use std::thread;
use std::sync::mpsc;

#[tauri::command]
pub fn list_sinks(user: String) -> String {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let command = Command::new("sh")
            .arg("-c")
            .arg(format!("sudo -u {} pw-cli list-objects Node", user))
            .output()
            .unwrap_or_else(|_| panic!("failed to execute pw-cli"));

        let result = String::from_utf8(command.stdout).expect("got non UTF-8 data");
        tx.send(result).unwrap();
    });

    rx.recv().unwrap()
}
