import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from '../entities/jwt.entity';

@Injectable()
export class TokenRepository {
  constructor(@InjectModel(Token) private tokenModel: typeof Token) {}

  async create(data: { userId: number; token: string }) {
    return this.tokenModel.create(data);
  }

  async findOne(id: number): Promise<Token | null> {
    return this.tokenModel.findOne({ where: { userId: id  } });
  }

  async updateRefreshToken(
    id: number,
    token: string,
  ): Promise<[affectedCount: number]> {
    return this.tokenModel.update({ token }, { where: { userId: id } });
  }
  async update(id: number): Promise<[affectedCount: number]> {
    return this.tokenModel.update({ token: null }, { where: { userId: id } });
  }

  async remove(id: number): Promise<number> {
    return this.tokenModel.destroy({ where: { id } });
  }
}
