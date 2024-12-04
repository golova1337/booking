import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'StartBeforeEnd', async: false })
@Injectable()
export class StartBeforeEndConstraint implements ValidatorConstraintInterface {
  constructor() {}

  validate(startTime: string, args: ValidationArguments): boolean {
    const date = args.object['date'];
    const endTime = args.object['endTime'];

    const startDateTimeString = `${date}T${startTime}:00`;
    const endDateTimeString = `${date}T${endTime}:00`;
    console.log(startDateTimeString, endDateTimeString);

    return new Date(startDateTimeString) < new Date(endDateTimeString);
  }
}

export function StartBeforeEnd(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: StartBeforeEndConstraint,
    });
  };
}
