import { Test, TestingModule } from '@nestjs/testing';
import { SocketclusterService } from './socketcluster.service';

describe('SocketclusterService', () => {
  let service: SocketclusterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketclusterService],
    }).compile();

    service = module.get<SocketclusterService>(SocketclusterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
