import { Module } from '@nestjs/common';
import { FirebaseModule } from '../firebase/firebase.module';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [FirebaseModule, FavoritesModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsRepository],
})
export class ProductsModule {}
