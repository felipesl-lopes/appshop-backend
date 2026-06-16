import { Injectable } from '@nestjs/common';
import { Cart } from './cart.interface';
import { CartRepository } from './cart.repository';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async getCart(userId: string): Promise<Record<string, Cart>> {
    return this.cartRepository.getCart(userId);
  }

  async updateQuantityProduct(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<void> {
    await this.cartRepository.updateQuantityProduct(
      userId,
      productId,
      quantity,
    );
  }

  async clearCart(userId: string): Promise<void> {
    await this.cartRepository.clearCart(userId);
  }
}
