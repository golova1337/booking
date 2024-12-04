import { Optional } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface BookingAttributes {
  id: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface BookingCreationAttributes
  extends Optional<BookingAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'bookings',
  paranoid: true,
  schema: 'public',
})
export class Booking extends Model<
  BookingAttributes,
  BookingCreationAttributes
> {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  date: string;

  @Column({
    type: DataType.TIME,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  })
  startTime: string;

  @Column({
    type: DataType.TIME,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  })
  endTime: string;
}
