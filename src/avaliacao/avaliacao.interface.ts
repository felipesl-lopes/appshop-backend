export interface Avaliacao {
  id: string;
  usuarioId: string;
  produtoId: string;
  pedidoId: string;
  nota: number;
  comentario: string;
  dataCriacao: Date;
}

export interface CriarAvaliacao {
  usuarioId: string;
  orderId: string;
  nota: number;
  comentario: string;
  dataCriacao?: string;
}
