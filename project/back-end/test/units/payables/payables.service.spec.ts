import { Test, TestingModule } from '@nestjs/testing';
import { PayablesService } from '../../../src/modules/payables/payables.service';

describe('PayablesService', () => {
  let service: PayablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayablesService],
    }).compile();

    service = module.get<PayablesService>(PayablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
