import { Module } from '@nestjs/common';
import { FavoritesController } from '../favorites/favorites.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { FavoritesRepository } from './favorites.repository';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [FirebaseModule],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository],
  exports: [FavoritesRepository],
})
export class FavoritesModule {}
