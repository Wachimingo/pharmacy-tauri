use serde::{Deserialize, Serialize};
use std::fs;

#[derive(Serialize, Deserialize)]
pub struct Product {
    id: u32,
    name: String,
    description: String,
    adquisition_date: String,
    expiration_date: String,
    lab: String,
    price: f32,
    amount: f32,
    total_price: f32,
}

#[tauri::command]
pub fn json_file(name: &str) -> Vec<Product>
where
    Vec<Product>: Serialize,
{
    let json: String = fs::read_to_string("json/".to_owned() + name).expect("Coudn't read file");
    serde_json::from_str::<Vec<Product>>(&json).expect("Couldn't parse")
}
