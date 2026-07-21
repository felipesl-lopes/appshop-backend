import { Injectable } from '@nestjs/common';
import axios from 'axios';
import 'dotenv/config';
import { FirebaseService } from 'src/firebase/firebase.service';
import {
  FirebaseAuthResponse,
  FirebaseRefreshTokenResponse,
  User,
} from './auth.interface';

@Injectable()
export class AuthRepository {
  private readonly apiKey = process.env.API_KEY;
  constructor(private readonly firebaseService: FirebaseService) {}

  async signIn(email: string, password: string): Promise<FirebaseAuthResponse> {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
      {
        email,
        password,
        returnSecureToken: true,
      },
    );

    return response.data as FirebaseAuthResponse;
  }

  async signUp(email: string, password: string): Promise<FirebaseAuthResponse> {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
      {
        email,
        password,
        returnSecureToken: true,
      },
    );

    return response.data as FirebaseAuthResponse;
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<FirebaseRefreshTokenResponse> {
    const response = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${this.apiKey}`,
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return response.data as FirebaseRefreshTokenResponse;
  }

  async getUser(userId: string): Promise<User | null> {
    const snapshot = await this.firebaseService
      .getDatabase()
      .ref(`users/${userId}`)
      .get();

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.val() as User;
  }

  async saveUser(userId: string, user: User): Promise<void> {
    await this.firebaseService.getDatabase().ref(`users/${userId}`).set(user);
  }
}
