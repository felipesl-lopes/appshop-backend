export interface Avaliacao {
  id: string;
  usuarioId: string;
  nomeUsuario: string;
  produtoId: string;
  pedidoId: string;
  nota: number;
  comentario: string;
  dataCriacao: Date;
}

export interface AvaliacaoResponse {
  id: string;
  nomeUsuario: string;
  produtoId: string;
  pedidoId: string;
  nota: number;
  comentario: string;
  dataCriacao: Date;
  minhaAvaliacao: boolean;
}

export interface CriarAvaliacao {
  usuarioId: string;
  orderId: string;
  nota: number;
  comentario: string;
  dataCriacao?: string;
}
