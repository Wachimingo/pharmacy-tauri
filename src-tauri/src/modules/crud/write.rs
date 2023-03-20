use chrono;
use serde::{Deserialize, Serialize};
use std::fs;
#[derive(Serialize, Deserialize, Debug)]
pub struct InputProduct {
    name: String,
    description: String,
    expiration_date: String,
    lab: String,
    price: f32,
    amount: f32,
}
#[derive(Serialize, Deserialize, Debug)]
struct ProcessedProduct {
    name: String,
    description: String,
    expiration_date: String,
    lab: String,
    price: f32,
    amount: f32,
    adquisition_date: String,
    total_price: f32,
}

#[tauri::command]
pub fn save_to_json_file(name: String, product: InputProduct) -> String {
    let new_product: ProcessedProduct = ProcessedProduct {
        name: product.name,
        description: product.description,
        expiration_date: product.expiration_date,
        lab: product.lab,
        price: product.price,
        amount: product.amount,
        adquisition_date: chrono::offset::Local::now().to_string(),
        total_price: product.price * product.amount,
    };
    println!("{:#?}", &new_product);
    let mut json_string: String =
        fs::read_to_string("json/".to_owned() + &name).expect("Coudn't read file");
    json_string.truncate(&json_string.len() - 1);
    let new_product_string: String = serde_json::to_string(&new_product).expect("Couldn't parse");
    let new_json_string: String = json_string + ", /n" + &new_product_string + "]";
    fs::write("json/".to_owned() + &name, new_json_string).expect("Cound't write to file");
    return "saved".to_string();
}
