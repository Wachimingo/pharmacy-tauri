use std::fs;

#[tauri::command]
pub fn delete_from_json(name: &str, product: &str) -> String {
    let json_file_string: String =
        fs::read_to_string("json/".to_owned() + name).expect("Couldn't read file");
    let new_json_file_string: String = json_file_string.replace(product, "");
    return "Value removed".to_string();
}
