import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsISO8601,
  IsMilitaryTime,
  IsString,
  Length,
} from 'class-validator';
import { StartBeforeEnd } from '../decorators/constraints/startBeforeEnd';

export class CreateBookingDto {
  /**
   * a name of the person who creates the reservation
   * @example petya
   */
  @IsDefined()
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(5, 100, {
    message: 'The length must be min 5, max 32',
  })
  name: string;

  /**
   * date of booking in thisformat YYYY-MM-DD
   * @example 2024-12-13
   */
  @IsDefined()
  @IsISO8601({ strict: true })
  date: string;

  /**
   * start of booking in this format HH:mm
   * @example  10:30
   */
  @IsDefined()
  @StartBeforeEnd({
    message: 'the start time  must be  longer than  the end time',
  })
  @IsMilitaryTime()
  startTime: string;

  /**
   * end of booking in this format HH:mm
   * @example 11:30
   */
  @IsDefined()
  @IsMilitaryTime()
  endTime: string;
}
