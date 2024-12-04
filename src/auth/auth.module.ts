import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CheckUserLoginConstraint } from './decorators/constraints/chaeckUserLogin';
import { IsPasswordsMatchingConstraint } from './decorators/constraints/isPasswordsMatching';
import { Token } from './entities/jwt.entity';
import { User } from './entities/user.entity';
import { TokenRepository } from './repositories/token.repository';
import { UserRepository } from './repositories/user.repository';
import { AuthService } from './services/auth.service';
import { JwtTokenService } from './services/jwt.service';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { CheckUserSignInConstraint } from './decorators/constraints/checkUserSignIn';
import { AuthController } from './controllers/auth.controller';
import { AccessTokenGuard } from './guards/accessToken.guard';

@Module({
  imports: [SequelizeModule.forFeature([User, Token])],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtTokenService,
    UserRepository,
    TokenRepository,
    CheckUserSignInConstraint,
    IsPasswordsMatchingConstraint,
    CheckUserLoginConstraint,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AuthModule {}
