import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from '../services/booking.service';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { UpdateBookingDto } from '../dto/update-booking.dto';
import { Booking } from '../entities/booking.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  /**
   * Create a new booking
   *
   * @remarks This operation allows you to create a new booking.
   * @throws {500} Server Error.
   * @throws {400} Slot are busy.
   */
  @Roles('user', 'admin')
  @Post()
  create(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.bookingService.create(createBookingDto);
  }

  /**
   * Find All bookings
   *
   * @remarks This operation allows you to get all bookings.
   * @throws {500} Server Error.
   */
  @Roles('user', 'admin')
  @Get()
  findAll(): Promise<Booking[]> {
    return this.bookingService.findAll();
  }

  /**
   * Get one booking
   *
   * @remarks This operation allows you to get a booking by id.
   * @throws {500} Server Error.
   * @throws {400} Bad Request.
   */
  @Roles('user', 'admin')
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Booking> {
    return this.bookingService.findOne(id);
  }

  /**
   * Update a booking
   *
   * @remarks This operation allows you to udpate a  booking.
   * @throws {500} Server Error.
   * @throws {400} Slot are busy.
   */
  @Roles('user', 'admin')
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateBookingDto: UpdateBookingDto,
  ): Promise<string> {
    return this.bookingService.update(id, updateBookingDto);
  }

  /**
   * Remove a booking
   *
   * @remarks This operation allows you to remove a booking by id.
   * @throws {500} Server Error.
   * @throws {400} Bad Request.
   */
  @Roles('user', 'admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bookingService.remove(id);
  }
}
