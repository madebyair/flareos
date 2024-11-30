use std::process::Command;

#[tauri::command]
pub fn create_user(name: String, uuid: String, password: String) -> String {
    println!("{}", name.clone());

    if user_exists(&name) {
        let new_name = if name.ends_with(|c: char| c.is_digit(10)) {
            let new_number = name.chars().rev().take_while(|c| c.is_digit(10)).collect::<String>().parse::<u32>().unwrap() + 1;
            name[..name.len() - new_number.to_string().len()].to_string() + &new_number.to_string()
        } else {
            name.clone() + "1"
        };
        println!("{}", new_name);
        return create_user(new_name, uuid.clone(), password.clone());
    }

    let commands = vec![
        format!("userdel {} 2>/dev/null || true", name),
        format!("mkdir -m 700 /storage/{}", uuid),
        format!("useradd -M {} -d /storage/{}", name, uuid),
        format!("chown {}:{} /storage/{}", name, name, uuid),
        format!("setfacl -m u:{}:r /etc", name),
        format!("setfacl -m u:{}:rx /usr/lib64", name),
        format!("setfacl -m u:{}:rx /usr/lib", name),
        format!("setfacl -m u:{}:0 /srv", name),
        format!("setfacl -m u:{}:0 /lost+found", name),
        format!("setfacl -m u:{}:r /var", name),
        format!("setfacl -m u:{}:r /proc", name),
        format!("setfacl -m u:{}:0 /boot", name),
        format!("setfacl -m u:{}:0 /home", name),
        format!("setfacl -m u:{}:0 /mnt", name),
        format!("setfacl -m u:{}:0 /opt", name),
        format!("setfacl -m u:{}:rx /bin", name),
        format!("setfacl -m u:{}:0 /usr/flareos", name),
        format!("setfacl -m u:{}:rx /usr/bin", name),
        format!("chmod -R 700 /storage/{}", uuid),
        format!("echo '{}:{}' | chpasswd", name, password),
        format!("mkdir -p /storage/{}/.config/systemd/user", uuid),
        format!("cp /etc/systemd/user/pipewire.service /storage/{}/.config/systemd/user/", uuid),
        format!("cp /etc/systemd/user/wireplumber.service /storage/{}/.config/systemd/user/", uuid),
        format!("sudo -u {} systemctl --user start pipewire.service", name),
        format!("sudo -u {} systemctl --user start wireplumber.service", name),
        format!("sudo -u {} flatpak remote-add --if-not-exists --user flathub https://dl.flathub.org/repo/flathub.flatpakrepo", name)
    ];

    for cmd in commands {
        Command::new("sh")
            .arg("-c")
            .arg(&cmd)
            .output()
            .expect(&format!("Failed to execute command: {}", cmd));
    }

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
