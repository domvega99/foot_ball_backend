// src/interfaces/flower-bouquet.interface.ts

export interface Product {
  id: number;
  product_name: string;
  description: string;
  slug: string;
  product_code: string;
  product_group: string;
  sizes: { id: number, size_name: string }[];
  colors: { id: number, color_name: string }[];
  varieties: { id: number, variety_name: string }[];
  delivery_type: { id: number, delivery_type_name: string }[];
  retail_price: number;
  retail_discount_price: number;
  product_price: number;
  cross_sell: { cross_sell_id: number }[];
  photos: { id: number, file_name: string, path_name: string }[];
}
