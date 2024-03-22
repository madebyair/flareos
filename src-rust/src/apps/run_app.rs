use std::process::Command;
use std::thread;
use std::sync::Arc;
use std::sync::Mutex;

#[tauri::command]
pub fn run_app(command: &str, user: &str) {
    let mut cmd = Command::new("sh");
    cmd.arg("-c").arg(format!("sudo -u {} {}", user, command));
    let command_string = command.to_string();

     let command = Arc::new(Mutex::new(cmd));
     let thread_command = Arc::clone(&command);

     thread::spawn(move || {
            let mut command = thread_command.lock().unwrap();

            let comm = command.output().expect("Failed to execute command.");

            let _result = match std::str::from_utf8(&comm.stdout) {
                Ok(val) => val.to_string(),
                Err(_) => panic!("Got non UTF-8 data"),
            };

            if !comm.status.success() {
                let exit_code = comm.status.code().unwrap_or(1);
                eprintln!("Process finished with non-zero exit code: {}, command: {}", exit_code, command_string);
            }
     });
}