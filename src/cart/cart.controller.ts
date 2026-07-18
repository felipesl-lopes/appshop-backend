import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Cart } from './cart.interface';
import { CartService } from './cart.service';
import { FirebaseAuthGuard } from 'src/auth/firebase_auth_guard';
import type { AuthenticatedRequest } from 'src/address/authenticate_request.interface';

@Controller('cartProducts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get()
  async getCart(
    @Req() req: AuthenticatedRequest,
  ): Promise<Record<string, Cart>> {
    return this.cartService.getCart(req.user.uid);
  }

  @UseGuards(FirebaseAuthGuard)
  @Patch(':productId')
  async updateQuantityProduct(
    @Param('productId') productId: string,
    @Req() req: AuthenticatedRequest,
    @Body() body: Cart,
  ): Promise<void> {
    await this.cartService.updateQuantityProduct(
      req.user.uid,
      productId,
      body.quantity,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Delete()
  async clearCart(@Req() req: AuthenticatedRequest): Promise<void> {
    await this.cartService.clearCart(req.user.uid);
  }
}
