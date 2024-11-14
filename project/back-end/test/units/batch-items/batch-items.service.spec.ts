import { Test, TestingModule } from '@nestjs/testing';
import { BatchItemsService } from '../../../src/modules/batch-items/batch-items.service';

describe('BatchItemsService', () => {
  let service: BatchItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BatchItemsService],
    }).compile();

    service = module.get<BatchItemsService>(BatchItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
