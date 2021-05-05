import { Module, OnModuleInit } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat.gateway';
//import { BatchNotificationModule } from './batch-notification/batch-notification.module';
// import { NotificationGateway } from './batch-notification/notification.gateway';
// import { WSService } from './socket-client';
import { WebsocketServerService } from './websocket-server/websocket-server.service';

import {PostGraphileModule} from 'postgraphile-nest';
import { MessagesModule } from './messages/messages.module';
import { GqlRequestModule } from './gql-request/gql-request.module';
import { BullJobModule } from './bull-job/bull-job.module';
import { SendGqlReqService } from './gql-request/send-gql-req.service';
import { GqlController } from './csvdownloder/csvdownload.controller';
import { CsvFileSaveService } from './csv-file-save/csv-file-save.service';
import { BullJobService } from './bull-job/bull-job.service';
import { WebSocketModule } from './websocket-server/websocket.module';
import { SocketclusterService } from './socketcluster/socketcluster.service';


@Module({
  imports: [GraphQLModule.forRoot({
    typePaths: ['./**/*.graphql']
  }), MessagesModule, GqlRequestModule, BullJobModule,WebSocketModule],
  controllers: [AppController, GqlController],
  providers: [AppService,ChatGateway, SendGqlReqService, CsvFileSaveService,BullJobService, SocketclusterService],
})
export class AppModule  implements OnModuleInit {
  async onModuleInit() {
  
    
  }
}
