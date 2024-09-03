use std::process::Command;
use std::thread;
use std::sync::mpsc;

#[tauri::command]
pub fn get_current_sink() -> String {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let command_output = Command::new("sh")
            .arg("-c")
            .arg("XDG_RUNTIME_DIR=/run/user/1000 wpctl status | awk '/Sinks:/ {sinks=1} sinks && /\\* / {print $3; exit}'")
            .output()
            .expect("failed to execute wpctl");

        let stdout = String::from_utf8(command_output.stdout)
            .expect("got non UTF-8 data");

        let result = stdout.replace(".", "").replace("\n", "");
        tx.send(result).unwrap();
    });

    rx.recv().unwrap()
}
