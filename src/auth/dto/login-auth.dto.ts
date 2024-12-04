import { Transform } from 'class-transformer';
import { IsDefined, IsEmail, IsString, Length, Matches } from 'class-validator';
import { CheckUserLogin } from '../decorators/constraints/chaeckUserLogin';

export class LoginAuthDto {
  /**
   * email
   * @example petya@gmail.com
   */
  @IsDefined()
  @Transform(({ value }) => value.trim())
  @IsEmail()
  @CheckUserLogin({ message: 'Bad Request' })
  email: string;

  /**
   * password
   * @example !Example12345
   */
  @IsDefined()
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(8, 32)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!/\_@#$%^&*()]).{8,}$/, {
    message:
      'Password must contain at least 1 uppercase letter, 1 number, and 1 symbol: ?=.[!/_@#$%^&()]',
  })
  password: string;
}
