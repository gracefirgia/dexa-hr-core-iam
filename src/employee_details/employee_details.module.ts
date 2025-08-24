import { Module } from '@nestjs/common';
import { EmployeeDetailsService } from './employee_details.service';
import { EmployeeDetailsController } from './employee_details.controller';

@Module({
  controllers: [EmployeeDetailsController],
  providers: [EmployeeDetailsService],
})
export class EmployeeDetailsModule {}
