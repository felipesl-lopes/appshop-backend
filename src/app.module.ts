import { Module } from '@nestjs/common';
import { AddressModule } from './address/address.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { BannersModule } from './banners/banners.module';
import { CartModule } from './cart/cart.module';
import { CategoriesModule } from './categories/categories.module';
import { CheckoutModule } from './checkout/checkout.module';
import { FavoritesModule } from './favorites/favorites.module';
import { FirebaseModule } from './firebase/firebase.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    FirebaseModule,
    AuthModule,
    ProductsModule,
    FavoritesModule,
    CategoriesModule,
    CartModule,
    OrdersModule,
    AddressModule,
    BannersModule,
    CheckoutModule,
    AvaliacaoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
