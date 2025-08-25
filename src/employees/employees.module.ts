import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Employee } from './employees.model';
import { EmployeeDetail } from 'src/employee_details/employee_details.model';
import { EmployeeToken } from 'src/employee_token/employee_token.model';
import { FirebaseAdminService } from 'src/firebase_admin/firebase_admin.service';
import { EmployeeTokenService } from 'src/employee_token/employee_token.service';

@Module({
  imports: [SequelizeModule.forFeature([Employee, EmployeeDetail, EmployeeToken])],
  controllers: [EmployeesController],
  providers: [EmployeesService, FirebaseAdminService, EmployeeTokenService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
