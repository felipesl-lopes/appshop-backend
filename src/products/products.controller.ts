import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Product, ProductResponse } from './products.interface';
import { ProductsService } from './products.service';
import { FirebaseAuthGuard } from 'src/auth/firebase_auth_guard';
import type { AuthenticatedRequest } from 'src/address/authenticate_request.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get()
  async getProducts(
    @Req() req: AuthenticatedRequest,
  ): Promise<ProductResponse[]> {
    return this.productsService.getProducts(req.user.uid);
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('my')
  async getMyProducts(
    @Req() req: AuthenticatedRequest,
  ): Promise<ProductResponse[]> {
    return this.productsService.getMyProducts(req.user.uid);
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('favorites')
  async getFavoritesProducts(
    @Req() req: AuthenticatedRequest,
  ): Promise<ProductResponse[]> {
    return this.productsService.getFavoritesProducts(req.user.uid);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.getProductById(id);
  }

  @UseGuards(FirebaseAuthGuard)
  @Post()
  async createProduct(
    @Req() req: AuthenticatedRequest,
    @Body() product: Omit<Product, 'id'>,
  ): Promise<string> {
    return this.productsService.createProduct({
      ...product,
      userId: req.user.uid,
    });
  }

  @UseGuards(FirebaseAuthGuard)
  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
    @Body() product: Omit<Product, 'id'>,
  ): Promise<ProductResponse> {
    return await this.productsService.updateProduct(id, {
      ...product,
      userId: req.user.uid,
    });
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    await this.productsService.deleteProduct(id);
  }
}
