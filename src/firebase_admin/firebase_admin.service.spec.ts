import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseAdminService } from './firebase_admin.service';

describe('FirebaseAdminService', () => {
  let service: FirebaseAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseAdminService],
    }).compile();

    service = module.get<FirebaseAdminService>(FirebaseAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
