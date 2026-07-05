import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { Product } from './products.interface';

@Injectable()
export class ProductsRepository {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getProducts(): Promise<Product[]> {
    const snapshot = await this.firebaseService
      .getDatabase()
      .ref('products')
      .get();

    const data = snapshot.val() as Record<string, Omit<Product, 'id'>> | null;

    if (!data) {
      return [];
    }

    return Object.entries(data).map(([id, product]) => ({
      id,
      ...product,
    }));
  }

  async getProductById(id: string): Promise<Product | null> {
    const snapshot = await this.firebaseService
      .getDatabase()
      .ref(`products/${id}`)
      .get();

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.val() as Omit<Product, 'id'>;

    return {
      id,
      ...data,
    };
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<string> {
    const ref = await this.firebaseService
      .getDatabase()
      .ref('products')
      .push(product);

    return ref.key as string;
  }

  async updateProduct(id: string, product: Omit<Product, 'id'>): Promise<void> {
    await this.firebaseService
      .getDatabase()
      .ref(`products/${id}`)
      .update(product);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.firebaseService.getDatabase().ref(`products/${id}`).remove();
  }

  async clearPromotion(id: string): Promise<void> {
    await this.firebaseService.getDatabase().ref(`products/${id}`).update({
      isPromotional: false,
      discountPercentage: null,
      promotionEndDate: null,
    });
  }
}
