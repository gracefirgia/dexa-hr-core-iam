import { Module } from '@nestjs/common';
import { EmployeeTokenService } from './employee_token.service';
import { EmployeeTokenController } from './employee_token.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeToken } from './employee_token.model';
import { Employee } from 'src/employees/employees.model';
import { Role } from 'src/roles/roles.model';

@Module({
  imports: [SequelizeModule.forFeature([EmployeeToken,  Employee, Role])],
  controllers: [EmployeeTokenController],
  providers: [EmployeeTokenService],
  exports: [EmployeeTokenService],
})
export class EmployeeTokenModule {}
