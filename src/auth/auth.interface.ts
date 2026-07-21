export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}

export interface FirebaseAuthResponse {
  localId: string;
  email: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface User {
  name: string;
  phoneNumber: number;
  city: string;
  country: string;
  address: string;
  birthDate?: string | null;
  avatarUrl: string;
}

export interface SignInDto {
  email: string;
  password: string;
}

export interface SignupDto {
  email: string;
  password: string;
  name: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface FirebaseRefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: string;
  token_type: string;
  id_token: string;
  user_id: string;
  project_id: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
