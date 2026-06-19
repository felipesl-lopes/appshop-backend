import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { FirebaseAuthResponse } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async signIn(email: string, password: string) {
    return this.authRepository.signIn(email, password);
  }

  async signUp(email: string, password: string) {
    return this.authRepository.signUp(email, password);
  }

  async refreshToken(refreshToken: string) {
    return this.authRepository.refreshToken(refreshToken);
  }

  async getUser(userId: string): Promise<FirebaseAuthResponse | null> {
    return this.authRepository.getUser(userId);
  }

  async saveUser(userId: string, user: FirebaseAuthResponse): Promise<void> {
    return this.authRepository.saveUser(userId, user);
  }
}
