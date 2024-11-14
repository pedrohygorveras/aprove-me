import { Test, TestingModule } from '@nestjs/testing';
import { BatchItemsController } from '../../../src/modules/batch-items/batch-items.controller';
import { BatchItemsService } from '../../../src/modules/batch-items/batch-items.service';

describe('BatchItemsController', () => {
  let controller: BatchItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BatchItemsController],
      providers: [BatchItemsService],
    }).compile();

    controller = module.get<BatchItemsController>(BatchItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
