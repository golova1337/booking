import { Optional } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.entity';

export interface JwtAttributes {
  id: number;
  userId: number;
  token: string;
}
export interface JwtCreationAttributes extends Optional<JwtAttributes, 'id'> {}

@Table({
  tableName: 'tokens',
  timestamps: true,
  paranoid: true,
})
export class Token extends Model<JwtAttributes, JwtCreationAttributes> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
  })
  userId: number;

  @Column({ type: DataType.STRING, allowNull: true })
  token: string;

  @BelongsTo(() => User)
  user: User;
}
