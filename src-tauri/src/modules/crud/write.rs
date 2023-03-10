use serde::Serialize;
use serde_json::Map;
use std::fs;

#[tauri::command]
pub fn save_to_json_file<K, V>(product: Map<K, V>) -> String
where
    serde_json::Map<K, V>: Serialize,
{
    let product_string = serde_json::to_string(&product).expect("Couldn't parse");
    // let file_content = fs::read_to_string("json/".to_owned() + name).expect("Coudn't read file");
    return "saved".to_string();
}
