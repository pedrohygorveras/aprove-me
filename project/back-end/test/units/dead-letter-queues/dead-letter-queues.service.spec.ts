import { Test, TestingModule } from '@nestjs/testing';
import { DeadLetterQueuesService } from '../../../src/modules/dead-letter-queues/dead-letter-queues.service';

describe('DeadLetterQueuesService', () => {
  let service: DeadLetterQueuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeadLetterQueuesService],
    }).compile();

    service = module.get<DeadLetterQueuesService>(DeadLetterQueuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
