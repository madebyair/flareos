use std::process::Command;
use std::thread;
use std::sync::mpsc;

#[tauri::command]
pub fn list_sinks() -> String {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let command = Command::new("sh")
            .arg("-c")
            .arg("XDG_RUNTIME_DIR=/run/user/1000 pw-cli list-objects Node")
            .output()
            .unwrap_or_else(|_| panic!("failed to execute pw-cli"));

        let result = String::from_utf8(command.stdout).expect("got non UTF-8 data");
        tx.send(result).unwrap();
    });

    rx.recv().unwrap()
}
