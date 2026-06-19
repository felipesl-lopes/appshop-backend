import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Address } from './address.interface';

@Injectable()
export class AddressRepository {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getAddress(userId: string): Promise<Address[]> {
    const snapshot = await this.firebaseService
      .getDatabase()
      .ref(`address/${userId}`)
      .get();

    const data = snapshot.val() as Record<string, Omit<Address, 'id'>> | null;

    if (!data) return [];

    return Object.entries(data).map(([id, product]) => ({
      id,
      ...product,
    }));
  }

  async searchAddress(
    userId: string,
    addressId: string,
  ): Promise<Address | null> {
    const snapshot = await this.firebaseService
      .getDatabase()
      .ref(`address/${userId}/${addressId}`)
      .get();

    if (!snapshot.exists()) return null;

    const data = snapshot.val() as Omit<Address, 'id'>;

    return {
      id: addressId,
      ...data,
    };
  }

  async addAddress(
    userId: string,
    address: Omit<Address, 'id'>,
  ): Promise<void> {
    await this.firebaseService
      .getDatabase()
      .ref(`address/${userId}`)
      .push(address);
  }

  async editAddress(
    userId: string,
    addressId: string,
    address: Omit<Address, 'id'>,
  ): Promise<void> {
    await this.firebaseService
      .getDatabase()
      .ref(`address/${userId}/${addressId}`)
      .update(address);
  }
}
