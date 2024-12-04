import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MyLogger } from 'src/common/logger/logger.service';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { SingInAuthDto } from '../dto/sing-in-auth.dto';
import { User } from '../entities/user.entity';
import { TokenRepository } from '../repositories/token.repository';
import { UserRepository } from '../repositories/user.repository';
import { JwtTokenService } from './jwt.service';
import { TokensDto } from '../dto/api/tokens.dto';
import { JwtPayload } from '../strategies/accessToken.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly jwtTokenService: JwtTokenService,
    private readonly logger: MyLogger,
  ) {}
  async singIn(
    singInAuthDto: SingInAuthDto,
  ): Promise<{ tokens: TokensDto; user: User }> {
    try {
      singInAuthDto.password = await bcrypt.hash(singInAuthDto.password, 10);
      delete singInAuthDto.passwordRepeat;

      const user = await this.userRepository.create(singInAuthDto);

      const tokens = await this.jwtTokenService.getTokens(user.id, user.role);

      await this.tokenRepository.create({
        userId: user.id,
        token: tokens.accessToken,
      });

      return {
        user,
        tokens,
      };
    } catch (error) {
      this.logger.error(`sign-in ${error}`);
      if (!(error instanceof HttpException)) {
        throw new InternalServerErrorException('Server Error');
      }
      throw error;
    }
  }

  async login(loginAuthDto: LoginAuthDto): Promise<TokensDto> {
    try {
      const { email, password } = loginAuthDto;
      const user: User = await this.userRepository.findByEmail(email);

      const compare = await bcrypt.compare(password, user.password);

      if (!compare) throw new BadRequestException('Bad Request');

      const tokens = await this.jwtTokenService.getTokens(user.id, user.role);

      await this.tokenRepository.updateRefreshToken(
        user.id,
        tokens.refreshToken,
      );

      return tokens;
    } catch (error) {
      this.logger.error(`login ${error}`);
      if (!(error instanceof HttpException)) {
        throw new InternalServerErrorException('Server Error');
      }
      throw error;
    }
  }

  async logout(id: number): Promise<string> {
    try {
      await this.tokenRepository.update(id);
      return 'successfully';
    } catch (error) {
      this.logger.error(`login ${error}`);
      if (!(error instanceof HttpException)) {
        throw new InternalServerErrorException('Server Error');
      }
      throw error;
    }
  }

  async refresh(user: JwtPayload): Promise<TokensDto> {
    try {
      const { id, role } = user;
      const tokens = await this.jwtTokenService.getTokens(id, role);
      await this.tokenRepository.updateRefreshToken(id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      this.logger.error(`login ${error}`);
      if (!(error instanceof HttpException)) {
        throw new InternalServerErrorException('Server Error');
      }
      throw error;
    }
  }
}
