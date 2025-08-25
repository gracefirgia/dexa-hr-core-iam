import { Module } from '@nestjs/common';
import { DataChangeRequestsService } from './data_change_requests.service';
import { DataChangeRequestsController } from './data_change_requests.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DataChangeRequest } from './data_change_requests.model';
import { FirebaseAdminService } from 'src/firebase_admin/firebase_admin.service';
import { EmployeeTokenService } from 'src/employee_token/employee_token.service';
import { EmployeeToken } from 'src/employee_token/employee_token.model';

@Module({
  imports: [
    SequelizeModule.forFeature([DataChangeRequest, EmployeeToken]),
  ],
  controllers: [DataChangeRequestsController],
  providers: [DataChangeRequestsService, FirebaseAdminService, EmployeeTokenService],
})
export class DataChangeRequestsModule {}
