use std::process::Command;

#[tauri::command]
pub fn create_user(name: String, uuid: String, password: String) {
    Command::new("sh")
             .arg("-c")
             .arg(format!("userdel {} 2>/dev/null || true", name))
             .output()
             .unwrap_or_else(|_| panic!("Main thread crashed by userdel {} 2>/dev/null", name));

    // Create folder in airos directory and remove old content
    Command::new("sh")
             .arg("-c")
             .arg(format!("rm -f /usr/airos/users/{} && mkdir -p /usr/airos/users/{}", uuid, uuid))
             .output()
             .unwrap_or_else(|_| panic!("Main thread crashed by rm -f /usr/airos/users/{} && mkdir -p /usr/airos/users/{}", uuid, uuid));

    // Now let's create unix user.
    Command::new("sh")
              .arg("-c")
              .arg(format!("useradd -M {}", name))
              .output()
              .unwrap_or_else(|_| panic!("Main thread crashed by useradd {}", name));


    // Set the password
   Command::new("sh")
              .arg("-c")
              .arg(format!("echo '{}:{}' | chpasswd", name, password))
              .output()
              .unwrap_or_else(|_| panic!("Main thread crashed by chpasswd`"));
}
