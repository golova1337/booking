import { Module } from '@nestjs/common';
import { BookingController } from './controllers/booking.controller';
import { BookingService } from './services/booking.service';
import { Booking } from './entities/booking.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookingRepository } from './repositories/booking.repository';

@Module({
  imports: [SequelizeModule.forFeature([Booking])],
  controllers: [BookingController],
  providers: [BookingService, BookingRepository],
})
export class BookingModule {}
