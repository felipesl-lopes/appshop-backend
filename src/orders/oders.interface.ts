import { Address } from 'src/address/address.interface';

export interface Orders {
  id?: string;
  total: number;
  products: Compras[];
  date: string;
  address: Address | null;
}

interface Compras {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}
