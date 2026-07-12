import { Module } from '@nestjs/common';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { AvaliacaoController } from './avaliacao.controller';
import { AvaliacaoRepository } from './avaliacao.repository';
import { AvaliacaoService } from './avaliacao.service';

@Module({
  imports: [FirebaseModule, OrdersModule, ProductsModule, UsersModule],
  controllers: [AvaliacaoController],
  providers: [AvaliacaoService, AvaliacaoRepository],
})
export class AvaliacaoModule {}
