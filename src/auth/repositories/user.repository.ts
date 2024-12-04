import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SingInAuthDto } from '../dto/sing-in-auth.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  async create(data: SingInAuthDto): Promise<User> {
    return this.userModel.create(data);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({
      where: { email: email },
    });
  }
}
