import { Module } from '@nestjs/common';
import { EmployeeDetailsService } from './employee_details.service';
import { EmployeeDetailsController } from './employee_details.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeDetail } from './employee_details.model';

@Module({
  imports: [SequelizeModule.forFeature([EmployeeDetail])],
  controllers: [EmployeeDetailsController],
  providers: [EmployeeDetailsService],
  
})
export class EmployeeDetailsModule {}
