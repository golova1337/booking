import { User } from 'src/auth/entities/user.entity';
import { TokensDto } from './tokens.dto';

export class UserAndTokens {
  user: User;
  tokens: TokensDto;
}
