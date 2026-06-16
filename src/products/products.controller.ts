import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import type { Product } from './products.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.getProductById(id);
  }

  @Post()
  async createProduct(@Body() product: Omit<Product, 'id'>): Promise<string> {
    return this.productsService.createProduct(product);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() product: Omit<Product, 'id'>,
  ): Promise<void> {
    await this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    await this.productsService.deleteProduct(id);
  }
}
