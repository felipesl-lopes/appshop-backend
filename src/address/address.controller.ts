import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/auth/firebase_auth_guard';
import { Address } from './address.interface';
import { AddressService } from './address.service';
import type { AuthenticatedRequest } from './authenticate_request.interface';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get()
  async getAddress(@Req() req: AuthenticatedRequest): Promise<Address[]> {
    return this.addressService.getAddress(req.user.uid);
  }

  @UseGuards(FirebaseAuthGuard)
  @Get(':addressId')
  async searchAddress(
    @Req() req: AuthenticatedRequest,
    @Param('addressId') addressId: string,
  ): Promise<Address | null> {
    return this.addressService.searchAddress(req.user.uid, addressId);
  }

  @UseGuards(FirebaseAuthGuard)
  @Post()
  async addAddress(
    @Req() req: AuthenticatedRequest,
    @Body() address: Omit<Address, 'id'>,
  ): Promise<Address> {
    return this.addressService.addAddress(req.user.uid, address);
  }

  @UseGuards(FirebaseAuthGuard)
  @Put(':addressId')
  async editAddress(
    @Req() req: AuthenticatedRequest,
    @Param('addressId') addressId: string,
    @Body() address: Omit<Address, 'id'>,
  ): Promise<void> {
    await this.addressService.editAddress(req.user.uid, addressId, address);
  }

  @UseGuards(FirebaseAuthGuard)
  @Delete(':addressId')
  async removeAddress(
    @Req() req: AuthenticatedRequest,
    @Param('addressId') addressId: string,
  ): Promise<void> {
    await this.addressService.removeAddress(req.user.uid, addressId);
  }
}
