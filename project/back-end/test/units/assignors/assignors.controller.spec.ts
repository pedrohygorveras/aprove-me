import { Test, TestingModule } from '@nestjs/testing';
import { AssignorsController } from '../../../src/modules/assignors/assignors.controller';
import { AssignorsService } from '../../../src/modules/assignors/assignors.service';

describe('AssignorsController', () => {
  let controller: AssignorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorsController],
      providers: [AssignorsService],
    }).compile();

    controller = module.get<AssignorsController>(AssignorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
