import { Test, TestingModule } from '@nestjs/testing';
import { GqlController } from './csvdownload.controller';
import { AppService } from '../app.service';
import { BullJobService } from '../bull-job/bull-job.service';
import { SendGqlReqService } from '../gql-request/send-gql-req.service';
import { SocketclusterService } from '../socketcluster/socketcluster.service';
import { WebsocketServerService } from '../websocket-server/websocket-server.service';
describe('GqlController', () => {
  let controller: GqlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers:[AppService,BullJobService,SendGqlReqService,WebsocketServerService,SocketclusterService],
      
      controllers: [GqlController],
    }).compile();

    controller = module.get<GqlController>(GqlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
