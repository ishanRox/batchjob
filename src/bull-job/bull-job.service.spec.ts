import { Test, TestingModule } from '@nestjs/testing';
import { CsvFileSaveService } from 'src/csv-file-save/csv-file-save.service';
import { SendGqlReqService } from 'src/gql-request/send-gql-req.service';
import { SocketclusterService } from 'src/socketcluster/socketcluster.service';
import { WebSocketModule } from 'src/websocket-server/websocket.module';
import { BullJobService } from './bull-job.service';

describe('BullJobService', () => {
  let service: BullJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BullJobService,CsvFileSaveService,SendGqlReqService,SocketclusterService],
      imports:[WebSocketModule]
    }).compile();

    service = module.get<BullJobService>(BullJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
