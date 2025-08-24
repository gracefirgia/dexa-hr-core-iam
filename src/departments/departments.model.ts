import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'departments', timestamps: false })
export class Department extends Model<Department> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare active: boolean;

  @Column({ field: 'created_at', type: DataType.DATE })
  declare createdAt: Date;

  @Column({ field: 'updated_at', type: DataType.DATE })
 declare updatedAt: Date;
}
