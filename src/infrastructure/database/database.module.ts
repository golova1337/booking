import { Global, Module } from '@nestjs/common';
import { connection } from './connection';
import { SequelizeModule } from '@nestjs/sequelize';

@Global()
@Module({
  imports: [connection],
  controllers: [],
  providers: [],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
