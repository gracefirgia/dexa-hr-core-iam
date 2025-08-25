import { Module } from '@nestjs/common';
import { DataChangeRequestsService } from './data_change_requests.service';
import { DataChangeRequestsController } from './data_change_requests.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DataChangeRequest } from './data_change_requests.model';

@Module({
  imports: [SequelizeModule.forFeature([DataChangeRequest])],
  controllers: [DataChangeRequestsController],
  providers: [DataChangeRequestsService],
})
export class DataChangeRequestsModule {}
