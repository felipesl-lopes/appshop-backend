import { ProductImage } from './productImage.interface';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrls: ProductImage[];
  categories: string[];
  userId: string;
  quantity: number;
  isFavorite: boolean;
  isPromotional: boolean;
  discountPercentage?: number;
  promotionEndDate?: Date;
}
