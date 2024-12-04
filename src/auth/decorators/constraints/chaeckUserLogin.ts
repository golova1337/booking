import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { User } from 'src/auth/entities/user.entity';
import { UserRepository } from 'src/auth/repositories/user.repository';

@ValidatorConstraint({ name: 'isEmailExist', async: true })
@Injectable()
export class CheckUserLoginConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async validate(email: string): Promise<boolean> {
    const user: User = await this.userRepository.findByEmail(email);

    return user ? true : false;
  }
}

export function CheckUserLogin(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckUserLoginConstraint,
    });
  };
}
