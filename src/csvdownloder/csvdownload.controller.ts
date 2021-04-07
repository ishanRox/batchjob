import { Controller, Get, Query, Res } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { SendGqlReqService } from 'src/gql-request/send-gql-req.service';
import { WebsocketServerService } from 'src/websocket-server/websocket-server.service';

@Controller('download')
export class GqlController {
    constructor(private gqlR: SendGqlReqService, private readonly appService: AppService, private notification: WebsocketServerService) {


    }
    
  @Get()
   async download(@Query() query):Promise<string> {
    console.log(query.lower);
    const result = await this.gqlR.sendGqlReq(query.lower, query.higher);
    await this.notification.broadcast(`${query.higher} to  ${query.lower} csv sended !`);
    return result;
  }

  
}
