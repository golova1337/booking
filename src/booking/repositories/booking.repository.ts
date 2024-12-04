import { Injectable } from '@nestjs/common';
import { Booking } from '../entities/booking.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { Op } from 'sequelize';
import { UpdateBookingDto } from '../dto/update-booking.dto';

@Injectable()
export class BookingRepository {
  constructor(@InjectModel(Booking) private bookingModel: typeof Booking) {}
  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.bookingModel.create(createBookingDto);
  }
  async findAll(): Promise<Booking[]> {
    return this.bookingModel.findAll();
  }

  async checkSlot(
    date: string,
    startTime: string,
    endTime: string,
  ): Promise<number> {
    return this.bookingModel.count({
      where: {
        date,
        startTime: { [Op.lt]: endTime },
        endTime: { [Op.gt]: startTime },
      },
    });
  }

  async findOneById(id: number): Promise<Booking | null> {
    return this.bookingModel.findByPk(id);
  }

  async update(
    id: number,
    updateBookingDto: UpdateBookingDto,
  ): Promise<[affectedCount: number]> {
    return this.bookingModel.update(updateBookingDto, { where: { id } });
  }

  async remove(id: number): Promise<number> {
    return this.bookingModel.destroy({ where: { id } });
  }
}
