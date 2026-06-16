import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import type { Cart } from './cart.interface';
import { CartService } from './cart.service';

@Controller('cartProducts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':userId')
  async getCart(
    @Param('userId') userId: string,
  ): Promise<Record<string, Cart>> {
    return this.cartService.getCart(userId);
  }

  @Patch(':userId/:productId')
  async updateQuantityProduct(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body() body: Cart,
  ): Promise<void> {
    await this.cartService.updateQuantityProduct(
      userId,
      productId,
      body.quantity,
    );
  }

  @Delete('userId')
  async clearCart(@Param('userId') userId: string): Promise<void> {
    await this.cartService.clearCart(userId);
  }
}
