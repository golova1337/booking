import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { TokensDto } from '../dto/api/tokens.dto';
import { UserAndTokens } from '../dto/api/userAndTokens.dto';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { SingInAuthDto } from '../dto/sing-in-auth.dto';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { RolesGuard } from '../guards/roles.guard';
import { AuthService } from '../services/auth.service';
import { JwtPayload } from '../strategies/accessToken.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Sign-in
   *
   * @remarks This operation allows you register .
   * @throws {500} Server Error.
   */
  @Public()
  @Post('sing-in')
  async singIn(@Body() singInAuthDto: SingInAuthDto): Promise<UserAndTokens> {
    return this.authService.singIn(singInAuthDto);
  }

  /**
   * Sign-in
   *
   * @remarks This operation allows you register .
   * @throws {500} Server Error.
   * @throws {400} Bad Requsest.
   */
  @Public()
  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto): Promise<TokensDto> {
    return this.authService.login(loginAuthDto);
  }

  /**
   * Logout
   *
   * @remarks This operation allows you logout .
   * @throws {500} Server Error.
   */
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('user', 'admin')
  @Post('logout')
  async logout(@UserDecorator('id') id: number): Promise<string> {
    return this.authService.logout(id);
  }

  /**
   * Logout
   *
   * @remarks This operation allows you update refresh token .
   * @throws {500} Server Error.
   */
  @Patch('/refresh')
  @Public()
  @Roles('user', 'admin')
  @UseGuards(RefreshTokenGuard, RolesGuard)
  @ApiBearerAuth()
  async refresh(@UserDecorator() user: JwtPayload) {
    return this.authService.refresh(user);
  }
}
