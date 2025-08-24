import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'employee_details'
})
export class EmployeeDetail extends Model<EmployeeDetail> {
  @PrimaryKey
  @Default(uuidv4)
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  @ForeignKey(() => Employee)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare employee_id: string;

  @BelongsTo(() => Employee, { as: 'employee' })
  declare employee: Employee;

  @Column({
    type: DataType.STRING,
  })
  declare photo: string;

  @Column({
    type: DataType.STRING,
  })
  declare phone: string;

  @Column({
    type: DataType.DATE,
  })
  declare join_date: string;

  @Column({
    type: DataType.DATE,
  })
  declare terminate_date: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare active: boolean;

  @Column({
    type: DataType.UUID,
  })
  declare created_by: string;
}
