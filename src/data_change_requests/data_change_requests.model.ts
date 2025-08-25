import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';

@Table({ tableName: 'data_change_requests', timestamps: true })
export class DataChangeRequest extends Model<DataChangeRequest> {
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
  declare code: string;

  @Column({ type: DataType.JSONB, allowNull: false })
  declare field_changes: string;

  @Column({ type: DataType.STRING })
  declare reviewed_by: string;

  @Column({ type: DataType.STRING, defaultValue: "PENDING" })
  declare status: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare type: string;

  @Column({ type: DataType.STRING, defaultValue: "PENDING" })
  declare notes: string;

  @Column({ type: DataType.DATE })
  declare requested_at?: Date;

  @Column({ field: 'created_at', type: DataType.DATE })
  declare createdAt?: Date;

  @Column({ field: 'updated_at', type: DataType.DATE })
 declare updatedAt?: Date;
}