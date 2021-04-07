import { Test, TestingModule } from '@nestjs/testing';
import { SendGqlReqService } from '../gql-request/send-gql-req.service';

describe('SendGqlReqService', () => {
  let service: SendGqlReqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendGqlReqService],
    }).compile();

    service = module.get<SendGqlReqService>(SendGqlReqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
