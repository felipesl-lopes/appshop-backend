import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Orders } from './oders.interface';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async getOrders(userId: string): Promise<Orders[]> {
    return this.ordersRepository.getOrders(userId);
  }

  async finalizeBuy(userId: string, order: Orders): Promise<string> {
    return this.ordersRepository.finalizeBuy(userId, order);
  }
}
