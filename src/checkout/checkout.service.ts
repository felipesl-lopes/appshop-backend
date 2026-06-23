import { Injectable } from '@nestjs/common';
import { CheckoutRepository } from './checkout.repository';

@Injectable()
export class CheckoutService {
  constructor(private readonly checkoutRepository: CheckoutRepository) {}

  async finalizeBuy(userId: string, addressId: string): Promise<string> {
    return this.checkoutRepository.finalizeBuy(userId, addressId);
  }
}
