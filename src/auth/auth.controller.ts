import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { FirebaseAuthResponse } from './auth.interface';

interface SignInDto {
  email: string;
  password: string;
}

interface RefreshTokenDto {
  refreshToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() body: SignInDto): Promise<FirebaseAuthResponse> {
    return this.authService.signIn(body.email, body.password);
  }

  @Post('signup')
  async signUp(@Body() body: SignInDto): Promise<FirebaseAuthResponse> {
    return this.authService.signUp(body.email, body.password);
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refreshToken(body.refreshToken);
  }

  @Get(':userId')
  async getUser(
    @Param('userId') userId: string,
  ): Promise<FirebaseAuthResponse | null> {
    return this.authService.getUser(userId);
  }

  @Put(':userId')
  async saveUser(
    @Param('userId') userId: string,
    @Body() user: FirebaseAuthResponse,
  ): Promise<void> {
    await this.authService.saveUser(userId, user);
  }
}
