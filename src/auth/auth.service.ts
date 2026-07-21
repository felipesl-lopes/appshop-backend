import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { AuthResponse, User } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async signIn(email: string, password: string): Promise<AuthResponse> {
    const auth = await this.authRepository.signIn(email, password);

    const user = await this.authRepository.getUser(auth.localId);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    return {
      accessToken: auth.idToken,
      refreshToken: auth.refreshToken,
      expiresIn: Number(auth.expiresIn),
      user,
    };
  }

  async signUp(
    email: string,
    password: string,
    name: string,
  ): Promise<AuthResponse> {
    const auth = await this.authRepository.signUp(email, password);

    const user: User = {
      name,
      phoneNumber: 0,
      city: '',
      country: '',
      address: '',
      birthDate: null,
      avatarUrl: '',
    };

    await this.authRepository.saveUser(auth.localId, user);

    return {
      accessToken: auth.idToken,
      refreshToken: auth.refreshToken,
      expiresIn: Number(auth.expiresIn),
      user,
    };
  }

  async refreshToken(refreshToken: string) {
    const auth = await this.authRepository.refreshToken(refreshToken);

    return {
      accessToken: auth.id_token,
      refreshToken: auth.refresh_token,
      expiresIn: Number(auth.expires_in),
    };
  }
}
