import { Test } from '@nestjs/testing';
import { ModuleMocker } from 'jest-mock';
import { MyLogger } from 'src/common/logger/logger.service';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { BookingRepository } from '../repositories/booking.repository';
import { BookingService } from '../services/booking.service';
import { UpdateBookingDto } from '../dto/update-booking.dto';

const moduleMocker = new ModuleMocker(global);

describe('BookingService', () => {
  let service: BookingService;
  let repository: BookingRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [BookingService],
    })
      .useMocker((token) => {
        if (token === BookingRepository) {
          return {
            create: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            checkSlot: jest.fn().mockResolvedValue(null),
            findOneById: jest.fn().mockResolvedValue(true),
            update: jest.fn().mockResolvedValue(null),
            remove: jest.fn().mockResolvedValue(1),
          };
        }
        if (token === MyLogger) {
          return { log: jest.fn(), error: jest.fn(), warn: jest.fn() };
        }
      })
      .compile();

    repository = moduleRef.get(BookingRepository);
    service = moduleRef.get(BookingService);
  });

  describe('Creatiom', () => {
    it('should call service.create', async () => {
      const createBookingDto: CreateBookingDto = {
        name: 'petya',
        date: '2024-12-15',
        startTime: '08:10',
        endTime: '09:10',
      };
      await service.create(createBookingDto);
      expect(repository.create).toHaveBeenCalled();
    });

    it('findAll', async () => {
      await service.findAll();
      expect(repository.findAll).toHaveBeenCalled();
    });

    it('find one ', async () => {
      await service.findOne(1);
      expect(repository.findOneById).toHaveBeenCalled();
    });

    it('update', async () => {
      const updateBookingDto: UpdateBookingDto = {
        name: 'petya',
        date: '2024-12-15',
        startTime: '08:10',
        endTime: '09:10',
      };
      await service.update(1, updateBookingDto);
      expect(repository.update).toHaveBeenCalled();
    });

    it('remove', async () => {
      await service.remove(1);
      expect(repository.remove).toHaveBeenCalled();
    });
  });
});
