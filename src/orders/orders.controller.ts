import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import type { Orders } from './oders.interface';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':userId')
  async getOrders(@Param('userId') userId: string): Promise<Orders[]> {
    return this.ordersService.getOrders(userId);
  }

  @Post(':userId')
  async finalizeBuy(
    @Param('userId') userId: string,
    @Body() order: Orders,
  ): Promise<string> {
    return this.ordersService.finalizeBuy(userId, order);
  }
}
