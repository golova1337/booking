import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { LoggerModule } from './common/logger/logger.module';
import { BookingModule } from './booking/booking.module';
import { AccessTokenGuard } from './auth/guards/accessToken.guard';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
    }),
    LoggerModule,
    BookingModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
