import { Injectable } from '@nestjs/common';
import { Product } from './products.interface';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getProducts(): Promise<Product[]> {
    return this.productsRepository.getProducts();
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.productsRepository.getProductById(id);
  }
}
