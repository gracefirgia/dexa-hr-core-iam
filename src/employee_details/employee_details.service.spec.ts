import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeDetailsService } from './employee_details.service';

describe('EmployeeDetailsService', () => {
  let service: EmployeeDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeDetailsService],
    }).compile();

    service = module.get<EmployeeDetailsService>(EmployeeDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
