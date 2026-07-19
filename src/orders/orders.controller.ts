import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import type { AuthenticatedRequest } from 'src/address/authenticate_request.interface';
import { FirebaseAuthGuard } from 'src/auth/firebase_auth_guard';
import type { Orders } from './oders.interface';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get()
  async getOrders(@Req() req: AuthenticatedRequest): Promise<Orders[]> {
    return this.ordersService.getOrders(req.user.uid);
  }

  @UseGuards(FirebaseAuthGuard)
  @Post()
  async finalizeBuy(
    @Req() req: AuthenticatedRequest,
    @Body() order: Orders,
  ): Promise<string> {
    return this.ordersService.finalizeBuy(req.user.uid, order);
  }
}
