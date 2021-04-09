import { Controller, Get, Query, Res } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { CsvFileSaveService } from 'src/csv-file-save/csv-file-save.service';
import { SendGqlReqService } from 'src/gql-request/send-gql-req.service';
import { WebsocketServerService } from 'src/websocket-server/websocket-server.service';

@Controller('download')
export class GqlController {
  constructor(private csvSave: CsvFileSaveService, private gqlR: SendGqlReqService, private readonly appService: AppService, private notification: WebsocketServerService) {


  }

  @Get()
  async download(@Query() query): Promise<string> {
    console.log(query.lower);
    const result = await this.gqlR.sendGqlReq(query.higher, query.lower);
    await this.notification.broadcast(`${query.higher} to  ${query.lower} csv sended !`);
    //res.setHeader('Content-Type', 'application/javascript');
    await this.csvSave.saveCsvFile();
    return result;
  }


}
