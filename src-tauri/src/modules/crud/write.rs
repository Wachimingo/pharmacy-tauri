use chrono;
use serde::{Deserialize, Serialize};
use std::fs;
#[derive(Serialize, Deserialize)]
pub struct InputProduct {
    last_id: i32,
    name: String,
    description: String,
    expiration_date: String,
    lab: String,
    price: f32,
    amount: i32,
}
#[derive(Serialize, Deserialize)]
pub struct ProcessedProduct {
    id: i32,
    name: String,
    description: String,
    expiration_date: String,
    lab: String,
    price: f32,
    amount: i32,
    adquisition_date: String,
    total_price: i32,
}

#[tauri::command]
pub fn save_to_json_file(name: String, product: InputProduct) -> ProcessedProduct {
    let new_product: ProcessedProduct = ProcessedProduct {
        id: product.last_id + 1,
        name: product.name,
        description: product.description,
        expiration_date: product.expiration_date,
        lab: product.lab,
        price: product.price,
        amount: product.amount,
        adquisition_date: chrono::offset::Local::now().to_string(),
        total_price: (product.price * product.amount as f32) as i32,
    };
    let json_string: String =
        fs::read_to_string("json/".to_owned() + &name).expect("Coudn't read file");
    let modified_json_string: &str = &json_string[0..json_string.len() - 1];
    let new_product_string: String = serde_json::to_string(&new_product).expect("Couldn't parse");
    let new_json_string: String = modified_json_string.to_owned() + "," + &new_product_string + "]";
    fs::write("json/".to_owned() + &name, new_json_string).expect("Cound't write to file");
    return new_product;
}
