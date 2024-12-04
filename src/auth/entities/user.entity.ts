import { Optional } from 'sequelize';
import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { Roles } from '../enum/role-enum';
import { Token } from './jwt.entity';
import { ApiHideProperty } from '@nestjs/swagger';

export interface PersonAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  token: string;
}

export interface PersonCreationAttributes
  extends Optional<PersonAttributes, 'id' | 'role' | 'token'> {}

@Table({
  timestamps: true,
  tableName: 'users',
  paranoid: true,
  schema: 'public',
})
export class User extends Model<PersonAttributes, PersonCreationAttributes> {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(32),
    unique: true,
    allowNull: true,
  })
  email: string;

  @Column({
    type: DataType.STRING(160),
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM(...Object.values(Roles)),
    defaultValue: Roles.User,
    allowNull: false,
  })
  role?: Roles;

  @ApiHideProperty()
  @HasOne(() => Token)
  jwt: Token;
}
