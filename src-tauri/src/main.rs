#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
mod modules;
use crate::modules::crud::read::json_file;
use crate::modules::crud::write::save_to_json_file;
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![json_file, save_to_json_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
