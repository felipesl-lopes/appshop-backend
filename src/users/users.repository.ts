import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly firebaseService: FirebaseService) {}

  async carregarNomeUsuario(userId: string): Promise<string> {
    const snapshot = await this.firebaseService
      .getDatabase()
      .ref(`users/${userId}`)
      .get();

    const user = snapshot.val() as { name?: string } | null;

    return user?.name ?? '';
  }
}
