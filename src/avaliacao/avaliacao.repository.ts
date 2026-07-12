import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { OrdersRepository } from 'src/orders/orders.repository';
import { CriarAvaliacao } from './avaliacao.interface';
import { ProductsRepository } from 'src/products/products.repository';

@Injectable()
export class AvaliacaoRepository {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly orderRepository: OrdersRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async enviarAvaliacao(
    productId: string,
    avaliacao: CriarAvaliacao,
  ): Promise<string> {
    const ref = await this.firebaseService
      .getDatabase()
      .ref(`avaliacao/${productId}`)
      .push();

    await ref.set({
      nota: avaliacao.nota,
      comentario: avaliacao.comentario,
      dataCriacao: avaliacao.dataCriacao,
    });

    await this.orderRepository.atualizarAvaliacaoId(
      avaliacao.usuarioId,
      avaliacao.orderId,
      productId,
      ref.key!,
    );

    await this.productsRepository.atualizarAvaliacaoProduto(
      productId,
      avaliacao.nota,
    );

    return ref.key!;
  }
}
