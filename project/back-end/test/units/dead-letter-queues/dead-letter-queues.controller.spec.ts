import { Test, TestingModule } from '@nestjs/testing';
import { DeadLetterQueuesController } from '../../../src/modules/dead-letter-queues/dead-letter-queues.controller';
import { DeadLetterQueuesService } from '../../../src/modules/dead-letter-queues/dead-letter-queues.service';

describe('DeadLetterQueuesController', () => {
  let controller: DeadLetterQueuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeadLetterQueuesController],
      providers: [DeadLetterQueuesService],
    }).compile();

    controller = module.get<DeadLetterQueuesController>(
      DeadLetterQueuesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
