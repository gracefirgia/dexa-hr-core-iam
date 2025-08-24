import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { Department } from 'src/departments/departments.model';
import { EmployeeDetail } from 'src/employee_details/employee_details.model';
import { Role } from 'src/roles/roles.model';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'employees',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Employee extends Model<Employee> {
  @PrimaryKey
  @Default(uuidv4)
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  @ForeignKey(() => Department)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare department_id: string;

  @BelongsTo(() => Department)
  declare department: Department;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare role_id: string;

  @BelongsTo(() => Role)
  declare role: Role;

  @Column({
    type: DataType.STRING,
  })
  declare employee_code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare active: boolean;

  @Column({
    type: DataType.UUID,
  })
  declare created_by: string;

  @HasOne(() => EmployeeDetail, { as: 'detail', foreignKey: 'employee_id' })
  declare employee_detail: EmployeeDetail;
}
