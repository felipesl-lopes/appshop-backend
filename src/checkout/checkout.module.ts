import { Module } from '@nestjs/common';
import { AddressModule } from 'src/address/address.module';
import { CartModule } from 'src/cart/cart.module';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductsModule } from 'src/products/products.module';
import { CheckoutController } from './checkout.controller';
import { CheckoutRepository } from './checkout.repository';
import { CheckoutService } from './checkout.service';

@Module({
  imports: [
    FirebaseModule,
    ProductsModule,
    AddressModule,
    OrdersModule,
    CartModule,
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService, CheckoutRepository],
})
export class CheckoutModule {}
