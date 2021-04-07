import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
   } from '@nestjs/websockets';
   import { Logger } from '@nestjs/common';
   import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements  OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    private logger: Logger = new Logger('AppGateway');
    afterInit(server: Server) {
        this.logger.log('Init');
        try {
            // Node.js socket server script
          const net = require('net');
          // Create a server object
          const server = net.createServer((socket) => {
            socket.on('data', (data) => {
              console.log(data.toString());
            });
            socket.write('SERVER: Hello! This is server speaking.<br>');
            socket.end('SERVER: Closing connection now.<br>');
          }).on('error', (err) => {
            console.error(err);
          });
          // Open server on port 9898
          server.listen(9898, () => {
            console.log('opened server on', server.address().port);
          });
         } catch (error) {
           console.log(error);
           
         }
       }
      
       handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
       }
      
       handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
       }
    // @SubscribeMessage('events')
    // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    //   return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
    // }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string): void {
        console.log(message);
        this.server.emit('Message', message + 'server');
    }
}