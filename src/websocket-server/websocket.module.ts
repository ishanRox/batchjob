
import { Module } from '@nestjs/common';
import { WebsocketServerService } from './websocket-server.service';

@Module({
   
    providers: [WebsocketServerService],
    exports: [WebsocketServerService]
   
  })
  export class WebSocketModule {}