import { Module } from '@nestjs/common';
import { EmployeeDetailsService } from './employee_details.service';
import { EmployeeDetailsController } from './employee_details.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeDetail } from './employee_details.model';
import { EmployeeToken } from 'src/employee_token/employee_token.model';
import { FirebaseAdminService } from 'src/firebase_admin/firebase_admin.service';
import { EmployeeTokenService } from 'src/employee_token/employee_token.service';

@Module({
  imports: [SequelizeModule.forFeature([EmployeeDetail, EmployeeToken])],
  controllers: [EmployeeDetailsController],
  providers: [EmployeeDetailsService, FirebaseAdminService, EmployeeTokenService],
  
})
export class EmployeeDetailsModule {}
