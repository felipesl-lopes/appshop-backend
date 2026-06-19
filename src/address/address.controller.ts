import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './address.interface';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':userId')
  async getAddress(@Param('userId') userId: string): Promise<Address[]> {
    return this.addressService.getAddress(userId);
  }

  @Get(':userId/:addressId')
  async searchAddress(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string,
  ): Promise<Address | null> {
    return this.addressService.searchAddress(userId, addressId);
  }

  @Post(':userId')
  async addAddress(
    @Param('userId') userId: string,
    @Body() address: Omit<Address, 'id'>,
  ): Promise<void> {
    await this.addressService.addAddress(userId, address);
  }

  @Put(':userId/:addressId')
  async editAddress(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string,
    @Body() address: Omit<Address, 'id'>,
  ): Promise<void> {
    await this.addressService.editAddress(userId, addressId, address);
  }
}
