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
// implements  OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
export class ChatGateway  {
    @WebSocketServer()
    server: Server;
    private logger: Logger = new Logger('AppGateway');

    // afterInit(server: Server) {
    //     this.logger.log('Init');
    //     try {
    //         // Node.js socket server script
    //       const net = require('net');
    //       // Create a server object
    //       const server = net.createServer((socket) => {
    //         socket.on('data', (data) => {
    //           console.log(data.toString());
    //         });
    //         socket.write('SERVER: Hello! This is server speaking.<br>');
            
    //       }).on('error', (err) => {
    //         console.error(err);
    //       });
    //       // Open server on port 9898
    //       server.listen(9898, () => {
    //         console.log('opened server on', server.address().port);
    //       });
    //      } catch (error) {
    //        console.log(error);
           
    //      }
    //    }
      
    //    users: number = 0;
   
    //    async handleConnection(){
   
    //        // A client has connected
    //        this.users++;
   
    //        // Notify connected clients of current users
    //        this.server.emit('users', this.users);
   
    //    }
   
    //    async handleDisconnect(){
   
    //        // A client has disconnected
    //        this.users--;
   
    //        // Notify connected clients of current users
    //        this.server.emit('users', this.users);
   
    //    }
   
    //    @SubscribeMessage('chat')
    //    async onChat(client, message){
    //        client.broadcast.emit('chat', message);
    //    }
}