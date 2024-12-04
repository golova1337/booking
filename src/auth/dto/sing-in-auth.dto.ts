import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { CheckUserSignIn } from '../decorators/constraints/checkUserSignIn';
import { IsPasswordsMatching } from '../decorators/constraints/isPasswordsMatching';

export class SingInAuthDto {
  /**
   *  name
   * @example petya
   */
  @IsDefined()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @Length(5, 100, {
    message: 'The length must be min 5, max 32',
  })
  name: string;

  /**
   *  email
   * @example petya@gmail.com
   */
  @IsDefined()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Length(8, 32, {
    message: 'The length must be min 8, max 32',
  })
  @CheckUserSignIn({ message: 'Bad Request' })
  email: string;

  /**
   * Password must contain at least 1 uppercase letter, 1 number, and 1 symbol: ?=.[!/_@#$%^&()]
   * @example !Example12345
   */
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @Length(8, 32)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!/\_@#$%^&*()]).{8,}$/, {
    message:
      'Password must contain at least 1 uppercase letter, 1 number, and 1 symbol: ?=.[!/_@#$%^&()]',
  })
  password: string;

  /**
   * repeat password
   * @example !Example12345
   */
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @Length(8, 32)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!/\_@#$%^&*()]).{8,}$/, {
    message:
      'Password repeat must contain at least 1 uppercase letter, 1 number, and 1 symbol: ?=.[!/_@#$%^&()]',
  })
  @IsPasswordsMatching({ message: 'The Passwords does not match' })
  passwordRepeat: string;
}
