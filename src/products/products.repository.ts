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
}
