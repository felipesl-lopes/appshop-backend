import { Body, Controller, Param, Post } from '@nestjs/common';
import { CheckoutService } from './checkout.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post(':userId')
  async finalize(
    @Param('userId') userId: string,
    @Body() body: { addressId: string },
  ) {
    return this.checkoutService.finalizeBuy(userId, body.addressId);
  }
}
