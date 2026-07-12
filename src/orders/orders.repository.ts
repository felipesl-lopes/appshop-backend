/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Orders } from './oders.interface';

@Injectable()
export class OrdersRepository {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getOrders(userId: string): Promise<Orders[]> {
    const snapshot = await this.firebaseService
      .getDatabase()
      .ref(`orders/${userId}`)
      .get();

    const data = snapshot.val() as Record<string, Omit<Orders, 'id'>> | null;

    if (!data) return [];

    return Object.entries(data).map(([id, address]) => ({
      id,
      ...address,
    }));
  }

  async finalizeBuy(userId: string, order: Orders): Promise<string> {
    const orderRef = await this.firebaseService
      .getDatabase()
      .ref(`orders/${userId}`)
      .push(order);

    return orderRef.key as string;
  }

  async atualizarAvaliacaoId(
    userId: string,
    orderId: string,
    productId: string,
    avaliacaoId: string,
  ): Promise<void> {
    const ref = this.firebaseService
      .getDatabase()
      .ref(`orders/${userId}/${orderId}/products`);

    const snapshot = await ref.get();

    const products = snapshot.val();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    for (const key of Object.keys(products)) {
      if (products[key].id === productId) {
        await ref.child(key).update({
          avaliacaoId,
        });

        break;
      }
    }
  }
}
