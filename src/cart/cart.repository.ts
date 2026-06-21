import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { Cart } from './cart.interface';

@Injectable()
export class CartRepository {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getCart(userId: string): Promise<Record<string, Cart>> {
    const snapshot = await this.firebaseService
      .getDatabase()
      .ref(`cartProducts/${userId}`)
      .get();

    const data = snapshot.val() as Record<string, Cart> | null;

    return data ?? {};
  }

  async updateQuantityProduct(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<void> {
    const ref = this.firebaseService
      .getDatabase()
      .ref(`cartProducts/${userId}/${productId}`);

    if (quantity <= 0) {
      await ref.remove();
      return;
    }

    await ref.set({
      quantity,
    });
  }

  async clearCart(userId: string): Promise<void> {
    await this.firebaseService
      .getDatabase()
      .ref(`cartProducts/${userId}`)
      .remove();
  }
}
