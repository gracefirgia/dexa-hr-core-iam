import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeTokenService } from './employee_token.service';

describe('EmployeeTokenService', () => {
  let service: EmployeeTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeTokenService],
    }).compile();

    service = module.get<EmployeeTokenService>(EmployeeTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
