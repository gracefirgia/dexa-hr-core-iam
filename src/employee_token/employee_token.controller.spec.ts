import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeTokenController } from './employee_token.controller';
import { EmployeeTokenService } from './employee_token.service';

describe('EmployeeTokenController', () => {
  let controller: EmployeeTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeTokenController],
      providers: [EmployeeTokenService],
    }).compile();

    controller = module.get<EmployeeTokenController>(EmployeeTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
