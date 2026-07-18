import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import type { AuthenticatedRequest } from 'src/address/authenticate_request.interface';
import { FirebaseAuthGuard } from 'src/auth/firebase_auth_guard';
import { CheckoutService } from './checkout.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @UseGuards(FirebaseAuthGuard)
  @Post()
  async finalize(
    @Req() req: AuthenticatedRequest,
    @Body() body: { addressId: string },
  ) {
    return this.checkoutService.finalizeBuy(req.user.uid, body.addressId);
  }
}
