import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Employee } from './employees.model';
import { EmployeeDetail } from 'src/employee_details/employee_details.model';

@Module({
  imports: [SequelizeModule.forFeature([Employee, EmployeeDetail])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
