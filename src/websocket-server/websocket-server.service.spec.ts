import { Test, TestingModule } from '@nestjs/testing';
import { WebsocketServerService } from './websocket-server.service';

describe('WebsocketServerService', () => {
  let service: WebsocketServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebsocketServerService],
    }).compile();

    service = module.get<WebsocketServerService>(WebsocketServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
