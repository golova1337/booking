import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { UpdateBookingDto } from '../dto/update-booking.dto';
import { BookingRepository } from '../repositories/booking.repository';
import { Booking } from '../entities/booking.entity';
import { MyLogger } from 'src/common/logger/logger.service';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly logger: MyLogger,
  ) {}
  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    try {
      const { name, date, startTime, endTime } = createBookingDto;
      const checkSlot = await this.bookingRepository.checkSlot(
        date,
        startTime,
        endTime,
      );
      if (checkSlot) throw new BadRequestException('Slot are busy');

      return this.bookingRepository.create(createBookingDto);
    } catch (error) {
      this.logger.error(`create booking ${error}`);
      if (!(error instanceof HttpException)) {
        throw new InternalServerErrorException('Server Error');
      }
      throw error;
    }
  }

  findAll(): Promise<Booking[]> {
    try {
      return this.bookingRepository.findAll();
    } catch (error) {
      this.logger.error(`find All bookings ${error}`);
      if (!(error instanceof HttpException)) {
        throw new InternalServerErrorException('Server Error');
      }
      throw error;
    }
  }

  async findOne(id: number): Promise<Booking> {
    try {
      const booking = await this.bookingRepository.findOneById(id);
      if (!booking) throw new BadRequestException('Bad Request');
      return booking;
    } catch (error) {
      this.logger.error(`find One booking ${error}`);
      if (!(error instanceof HttpException)) {
        throw new InternalServerErrorException('Server Error');
      }
      throw error;
    }
  }

  async update(
    id: number,
    updateBookingDto: UpdateBookingDto,
  ): Promise<string> {
    try {
      const { name, date, startTime, endTime } = updateBookingDto;
      const checkSlot = await this.bookingRepository.checkSlot(
        date,
        startTime,
        endTime,
      );
      if (checkSlot) throw new BadRequestException('Slot are busy');
      const updateBokking: [affectedCount: number] =
        await this.bookingRepository.update(id, updateBookingDto);

      return 'The update was successful';
    } catch (error) {
      this.logger.error(`update booking ${error}`);
      if (!(error instanceof HttpException)) {
        throw new InternalServerErrorException('Server Error');
      }
      throw error;
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const count = await this.bookingRepository.remove(id);
      if (count) return 'successful';
      throw new BadRequestException('Bad Request');
    } catch (error) {
      this.logger.error(`remove booking ${error}`);
      if (!(error instanceof HttpException)) {
        throw new InternalServerErrorException('Server Error');
      }
      throw error;
    }
  }
}
