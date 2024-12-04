import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from 'src/auth/entities/jwt.entity';
import { User } from 'src/auth/entities/user.entity';
import { Booking } from 'src/booking/entities/booking.entity';

export const connection = SequelizeModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    dialect: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    port: configService.get<number>('POSTGRES_PORT') || 5432,
    username: configService.get<string>('POSTGRES_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: 'postgres',
    models: [User, Token, Booking],
    pool: {
      max: 10,
      min: 3,
    },
    autoLoadModels: true,
    synchronize: true,
  }),
  inject: [ConfigService],
});
