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
}
