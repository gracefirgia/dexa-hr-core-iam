import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';

@Table({ tableName: 'employee_tokens', timestamps: true })
export class EmployeeToken extends Model<EmployeeToken> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id?: string;

  @ForeignKey(() => Employee)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare employee_id?: string;

  @BelongsTo(() => Employee, { as: 'employee' })
  declare employee?: Employee;

  @Column({ type: DataType.STRING, allowNull: false })
  declare fcm_token: string;

  @Column({ field: 'created_at', type: DataType.DATE })
  declare createdAt?: Date;

  @Column({ field: 'updated_at', type: DataType.DATE })
 declare updatedAt?: Date;
}