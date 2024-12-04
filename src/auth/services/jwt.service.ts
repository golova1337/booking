import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async getTokens(userId: number, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          role,
        },
        {
          secret: this.configService.get<string>('ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          role,
        },
        {
          secret: this.configService.get<string>('REFRESH_SECRETE'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
