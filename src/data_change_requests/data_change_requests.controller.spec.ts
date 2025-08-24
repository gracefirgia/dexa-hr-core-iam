import { Test, TestingModule } from '@nestjs/testing';
import { DataChangeRequestsController } from './data_change_requests.controller';
import { DataChangeRequestsService } from './data_change_requests.service';

describe('DataChangeRequestsController', () => {
  let controller: DataChangeRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataChangeRequestsController],
      providers: [DataChangeRequestsService],
    }).compile();

    controller = module.get<DataChangeRequestsController>(DataChangeRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
