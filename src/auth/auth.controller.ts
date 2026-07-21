import { Body, Controller, Post } from '@nestjs/common';
import type {
  AuthResponse,
  RefreshTokenDto,
  RefreshTokenResponse,
  SignInDto,
  SignupDto,
} from './auth.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() body: SignInDto): Promise<AuthResponse> {
    return this.authService.signIn(body.email, body.password);
  }

  @Post('signup')
  async signUp(@Body() body: SignupDto): Promise<AuthResponse> {
    return this.authService.signUp(body.email, body.password, body.name);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() body: RefreshTokenDto,
  ): Promise<RefreshTokenResponse> {
    return this.authService.refreshToken(body.refreshToken);
  }
}
