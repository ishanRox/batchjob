import { Test, TestingModule } from '@nestjs/testing';
import { BullJobService } from './bull-job.service';

describe('BullJobService', () => {
  let service: BullJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BullJobService],
    }).compile();

    service = module.get<BullJobService>(BullJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
