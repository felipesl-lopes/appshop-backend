import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { OrdersRepository } from 'src/orders/orders.repository';
import {
  Avaliacao,
  AvaliacaoResponse,
  CriarAvaliacao,
} from './avaliacao.interface';
import { ProductsRepository } from 'src/products/products.repository';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AvaliacaoRepository {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly orderRepository: OrdersRepository,
    private readonly productsRepository: ProductsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async carregarAvaliacoesPorProduto(
    productId: string,
  ): Promise<AvaliacaoResponse[]> {
    const snapshot = await this.firebaseService
      .getDatabase()
      .ref(`avaliacao/${productId}`)
      .get();

    const data = snapshot.val() as Record<string, Omit<Avaliacao, 'id'>> | null;

    if (!data) {
      return [];
    }

    const avaliacoes = await Promise.all(
      Object.entries(data).map(async ([id, avaliacao]) => {
        const nomeUsuario = await this.usersRepository.carregarNomeUsuario(
          avaliacao.usuarioId,
        );

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { usuarioId, ...resto } = avaliacao;

        return {
          id,
          ...resto,
          nomeUsuario,
          dataCriacao: new Date(avaliacao.dataCriacao),
        };
      }),
    );

    return avaliacoes;
  }

  async enviarAvaliacao(
    productId: string,
    avaliacao: CriarAvaliacao,
  ): Promise<{
    avaliacaoId: string;
    notaMedia: number;
    totalAvaliacoes: number;
  }> {
    const ref = await this.firebaseService
      .getDatabase()
      .ref(`avaliacao/${productId}`)
      .push();

    await ref.set({
      nota: avaliacao.nota,
      comentario: avaliacao.comentario,
      dataCriacao: avaliacao.dataCriacao,
      usuarioId: avaliacao.usuarioId,
    });

    await this.orderRepository.atualizarAvaliacaoId(
      avaliacao.usuarioId,
      avaliacao.orderId,
      productId,
      ref.key!,
    );

    const { notaMedia, totalAvaliacoes } =
      await this.productsRepository.atualizarAvaliacaoProduto(
        productId,
        avaliacao.nota,
      );

    return {
      avaliacaoId: ref.key!,
      notaMedia,
      totalAvaliacoes,
    };
  }
}
