import { Module } from '@nestjs/common';
import { CsvFileSaveService } from 'src/csv-file-save/csv-file-save.service';
import { SendGqlReqService } from 'src/gql-request/send-gql-req.service';
import { SocketclusterService } from 'src/socketcluster/socketcluster.service';
import { WebSocketModule } from 'src/websocket-server/websocket.module';
import { BullJobService } from './bull-job.service';

@Module({
  providers: [BullJobService,CsvFileSaveService,SendGqlReqService,SocketclusterService],
  imports:[WebSocketModule]
})
export class BullJobModule {}
