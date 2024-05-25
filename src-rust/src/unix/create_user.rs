use std::process::Command;

#[tauri::command]
pub fn create_user(name: String, uuid: String, password: String) -> String {
    if user_exists(&name) {
        let new_name = if name.ends_with(|c: char| c.is_digit(10)) {
            let new_number = name.chars().rev().take_while(|c| c.is_digit(10)).collect::<String>().parse::<u32>().unwrap() + 1;
            name[..name.len() - new_number.to_string().len()].to_string() + &new_number.to_string()
        } else {
            name.clone() + "1"
        };
        println!("Frontend requested creation of new user, but it's already used, so shell will create with new name: {}", new_name);
        return create_user(new_name, uuid.clone(), password.clone());
    }

    Command::new("sh")
        .arg("-c")
        .arg(format!("userdel {} 2>/dev/null || true", name))
        .output()
        .expect(&format!("Failed to execute userdel for {}", name));

    Command::new("sh")
        .arg("-c")
        .arg(format!("rm -f /usr/airos/users/{} && mkdir -p /usr/airos/users/{}", uuid, uuid))
        .output()
        .expect(&format!("Failed to manage user directory for {}", uuid));

    Command::new("sh")
        .arg("-c")
        .arg(format!("useradd -M {}", name))
        .output()
        .expect(&format!("Failed to add user {}", name));

    Command::new("sh")
        .arg("-c")
        .arg(format!("echo '{}:{}' | chpasswd", name, password))
        .output()
        .expect("Failed to set password");

    name
}

fn user_exists(name: &str) -> bool {
    let command = Command::new("sh")
        .arg("-c")
        .arg(format!("getent passwd {}", name))
        .output()
        .expect("Failed to execute getent");

    command.status.success()
}
