import { Product } from 'src/products/products.interface';

export interface Cart {
  product: Product;
  quantity: number;
}
