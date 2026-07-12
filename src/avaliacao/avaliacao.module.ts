import { Module } from '@nestjs/common';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { AvaliacaoController } from './avaliacao.controller';
import { AvaliacaoRepository } from './avaliacao.repository';
import { AvaliacaoService } from './avaliacao.service';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [FirebaseModule, OrdersModule, ProductsModule],
  controllers: [AvaliacaoController],
  providers: [AvaliacaoService, AvaliacaoRepository],
})
export class AvaliacaoModule {}
