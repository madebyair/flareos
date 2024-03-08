use std::process::Command;

#[tauri::command]
pub fn create_user(name: String, uuid: String, password: String) -> String {
    let exists = user_exists(name.clone());

    if (exists) {
        println!("Frontend requested creation of new user, but it's arleady used, so shell will create with new name: {}", name);
        return create_user(name.clone() + "1", uuid.clone(), password.clone());
    }

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

   name
}

fn user_exists(name: String) -> bool {
    let command = Command::new("sh")
        .arg("-c")
        .arg(format!("getent passwd {}", name))
        .output()
        .unwrap_or_else(|_| panic!("Main thread crashed by getent"));

    let exit = command.status.code().unwrap_or(1);

    exit == 2
}
