import { Test, TestingModule } from '@nestjs/testing';
import { BatchsController } from '../../../src/modules/batchs/batchs.controller';
import { BatchsService } from '../../../src/modules/batchs/batchs.service';

describe('BatchsController', () => {
  let controller: BatchsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BatchsController],
      providers: [BatchsService],
    }).compile();

    controller = module.get<BatchsController>(BatchsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
