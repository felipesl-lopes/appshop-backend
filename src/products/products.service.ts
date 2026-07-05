import { Injectable } from '@nestjs/common';
import { Product } from './products.interface';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getProducts(): Promise<Product[]> {
    const products = await this.productsRepository.getProducts();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const product of products) {
      if (
        product.isPromotional &&
        product.promotionEndDate &&
        new Date(product.promotionEndDate) < today
      ) {
        await this.productsRepository.clearPromotion(product.id);

        product.isPromotional = false;
        product.discountPercentage = undefined;
        product.promotionEndDate = undefined;
      }
    }
    return products;
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.productsRepository.getProductById(id);
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<string> {
    return this.productsRepository.createProduct(product);
  }

  async updateProduct(id: string, product: Omit<Product, 'id'>): Promise<void> {
    await this.productsRepository.updateProduct(id, product);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productsRepository.deleteProduct(id);
  }
}
