import { Controller, Get, Query, Res } from '@nestjs/common';
import { AppService } from '../app.service';
import { BullJobService } from '../bull-job/bull-job.service';
import { SendGqlReqService } from '../gql-request/send-gql-req.service';
import { SocketclusterService } from '../socketcluster/socketcluster.service';
import { WebsocketServerService } from '../websocket-server/websocket-server.service';

@Controller('download')
export class GqlController {
  constructor(private socketServer:SocketclusterService, private bullJob: BullJobService, private gqlR: SendGqlReqService, private readonly appService: AppService, private notification: WebsocketServerService) {

    socketServer.startSocketClusterServer();
  }

  @Get()
  async download(@Query() query): Promise<string> {
    console.log(query);
     return  await this.bullJob.saveCsvToServer(query);
  }


}
