use std::fs;

// struct Product {
//     id: u32,
//     name: String,
//     description: String,
//     adquisitionDate: String,
//     expirationDate: String,
//     lab: String,
//     price: u32,
//     amount: u32,
//     totalPrice: u32,
// }

#[tauri::command]
pub fn json_file(name: &str) -> String {
    let file_content = fs::read_to_string("json/".to_owned() + name).expect("Coudn't read file");
    return file_content;
}

// #[tauri::command]
// pub fn greet(name: &str) -> String {
//    format!("Hello, {}!", name)
// }
