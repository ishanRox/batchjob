import { Controller, Get, Query, Res } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { BullJobService } from 'src/bull-job/bull-job.service';
import { CsvFileSaveService } from 'src/csv-file-save/csv-file-save.service';
import { SendGqlReqService } from 'src/gql-request/send-gql-req.service';
import { SocketclusterService } from 'src/socketcluster/socketcluster.service';
import { WebsocketServerService } from 'src/websocket-server/websocket-server.service';

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
