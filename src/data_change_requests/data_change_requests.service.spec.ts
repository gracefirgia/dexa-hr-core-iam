import { Test, TestingModule } from '@nestjs/testing';
import { DataChangeRequestsService } from './data_change_requests.service';

describe('DataChangeRequestsService', () => {
  let service: DataChangeRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataChangeRequestsService],
    }).compile();

    service = module.get<DataChangeRequestsService>(DataChangeRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
