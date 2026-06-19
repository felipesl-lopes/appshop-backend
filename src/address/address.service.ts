import { Injectable } from '@nestjs/common';
import { Address } from './address.interface';
import { AddressRepository } from './address.repository';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async getAddress(userId: string): Promise<Address[]> {
    return this.addressRepository.getAddress(userId);
  }

  async searchAddress(
    userId: string,
    addressId: string,
  ): Promise<Address | null> {
    return this.addressRepository.searchAddress(userId, addressId);
  }

  async addAddress(
    userId: string,
    address: Omit<Address, 'id'>,
  ): Promise<void> {
    return this.addressRepository.addAddress(userId, address);
  }

  async editAddress(
    userId: string,
    addressId: string,
    address: Omit<Address, 'id'>,
  ): Promise<void> {
    return this.addressRepository.editAddress(userId, addressId, address);
  }
}
