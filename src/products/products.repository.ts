import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { Product, ProductResponse } from './products.interface';

@Injectable()
export class ProductsRepository {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getProducts(userId: string): Promise<ProductResponse[]> {
    const snapshot = await this.firebaseService
      .getDatabase()
      .ref('products')
      .get();

    const data = snapshot.val() as Record<string, Omit<Product, 'id'>> | null;

    if (!data) {
      return [];
    }

    const filteredData = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).filter(([_, product]) => product.userId !== userId),
    ) as Record<string, Omit<Product, 'id'>>;

    return this.returnProducts(filteredData);
  }

  async getMyProducts(userId: string): Promise<ProductResponse[]> {
    const snapshot = await this.firebaseService
      .getDatabase()
      .ref('products')
      .orderByChild('userId')
      .equalTo(userId)
      .get();

    const data = snapshot.val() as Record<string, Omit<Product, 'id'>> | null;

    return this.returnProducts(data);
  }

  private returnProducts(
    data: Record<string, Omit<Product, 'id'>> | null,
  ): ProductResponse[] {
    if (!data) {
      return [];
    }

    return Object.entries(data).map(([id, product]) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { userId: _userId, ...productWithoutUserId } = product;

      return {
        id,
        ...productWithoutUserId,
        notaMedia: Number(product.notaMedia ?? 0.0),
        totalAvaliacoes: product.totalAvaliacoes ?? 0,
      };
    });
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

  async updateProduct(
    id: string,
    product: Omit<Product, 'id'>,
  ): Promise<ProductResponse> {
    await this.firebaseService
      .getDatabase()
      .ref(`products/${id}`)
      .update(product);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userId, ...productResponse } = product;

    return {
      id,
      ...productResponse,
      notaMedia: Number(product.notaMedia ?? 0.0),
      totalAvaliacoes: product.totalAvaliacoes ?? 0,
    };
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

  async atualizarAvaliacaoProduto(
    id: string,
    nota: number,
  ): Promise<{ notaMedia: number; totalAvaliacoes: number }> {
    interface ProductAvaliacao {
      totalAvaliacoes?: number;
      notaMedia?: number;
    }

    const ref = this.firebaseService.getDatabase().ref(`products/${id}`);

    const snapshot = await ref.get();

    const produto = snapshot.val() as ProductAvaliacao | null;

    const totalAtual = produto?.totalAvaliacoes ?? 0;
    const mediaAtual = produto?.notaMedia ?? 0;

    const novoTotal = totalAtual + 1;
    const novaMedia = Number(
      ((mediaAtual * totalAtual + nota) / novoTotal).toFixed(2),
    );

    await ref.update({
      totalAvaliacoes: novoTotal,
      notaMedia: novaMedia.toFixed(2),
    });

    return { notaMedia: novaMedia, totalAvaliacoes: novoTotal };
  }
}
