import { Module } from '@nestjs/common';
import { DataChangeRequestsService } from './data_change_requests.service';
import { DataChangeRequestsController } from './data_change_requests.controller';

@Module({
  controllers: [DataChangeRequestsController],
  providers: [DataChangeRequestsService],
})
export class DataChangeRequestsModule {}
