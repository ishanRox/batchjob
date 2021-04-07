import { Controller, Get, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { GqlRequestModule } from './gql-request/gql-request.module';
import { SendGqlReqService } from './gql-request/send-gql-req.service';
import { WebsocketServerService } from './websocket-server/websocket-server.service';

@Controller()
export class AppController {
  constructor(private gqlR: SendGqlReqService, private readonly appService: AppService, private notification: WebsocketServerService) {


  }

  @Get()
  getHello(): string {
    console.log('hello called');
    this.notification.broadcast('from server');
    return this.appService.getHello();
  }

  @Get('download')
  async download(@Query() query, @Res() res) {
    console.log(query.lower);
    const result = await this.gqlR.sendGqlReq(query.lower, query.higher);

    res.setHeader('Content-Type', 'application/octet-stream');
    // res.attachment()
    await this.notification.broadcast(`${query.higher} to  ${query.lower} csv sended !`);
    return res.download("f:\\basic.txt");
  }


}
