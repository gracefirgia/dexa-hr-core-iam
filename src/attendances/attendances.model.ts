import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';

@Table({ tableName: 'attendances', timestamps: true })
export class Attendance extends Model<Attendance, AttendanceCreationAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => Employee)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare employee_id: string;

  @BelongsTo(() => Employee)
  declare employee?: Employee;

  @Column({ type: DataType.DATE })
  declare clock_in?: string;

  @Column({ type: DataType.DATE })
  declare clock_out?: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare active: boolean;

  @Column({ field: 'created_at', type: DataType.DATE })
  declare createdAt: Date;

  @Column({ field: 'updated_at', type: DataType.DATE })
  declare updatedAt: Date;
}

export type AttendanceCreationAttributes = {
  employee_id: string;
  clock_in?: string;
  clock_out?: string;
  active?: boolean;
};