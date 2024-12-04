import { Test } from '@nestjs/testing';
import { ModuleMocker } from 'jest-mock';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { UpdateBookingDto } from '../dto/update-booking.dto';
import { BookingService } from '../services/booking.service';
import { BookingController } from './booking.controller';

const moduleMocker = new ModuleMocker(global);

describe('BookingController', () => {
  let controller: BookingController;
  let service: BookingService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BookingController],
    })
      .useMocker((token) => {
        if (token === BookingService) {
          return {
            create: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            findOne: jest.fn().mockResolvedValue(null),
            update: jest.fn().mockResolvedValue(null),
            remove: jest.fn().mockResolvedValue(null),
          };
        }
      })
      .compile();

    controller = moduleRef.get(BookingController);
    service = moduleRef.get(BookingService);
  });

  describe('Creation', () => {
    it('should call service.create', async () => {
      const createBookingDto: CreateBookingDto = {
        name: 'petya',
        date: '2024-12-15',
        startTime: '08:10',
        endTime: '09:10',
      };
      await controller.create(createBookingDto);
      expect(service.create).toHaveBeenCalled();
    });

    it('should call service.findAll', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should call service.findOneById', async () => {
      await controller.findOne(1);
      expect(service.findOne).toHaveBeenCalled();
    });

    it('should call service.update', async () => {
      const updateBookingDto: UpdateBookingDto = {
        name: 'petya',
        date: '2024-12-15',
        startTime: '08:10',
        endTime: '09:10',
      };
      await controller.update(1, updateBookingDto);
      expect(service.update).toHaveBeenCalled();
    });

    it('should call service.remove', async () => {
      await controller.remove(1);
      expect(service.remove).toHaveBeenCalled();
    });
  });
});
