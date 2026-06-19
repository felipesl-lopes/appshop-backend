import { Module } from '@nestjs/common';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { BannersController } from './banners.controller';
import { BannersRepository } from './banners.repository';
import { BannersService } from './banners.service';

@Module({
  imports: [FirebaseModule],
  controllers: [BannersController],
  providers: [BannersService, BannersRepository],
})
export class BannersModule {}
