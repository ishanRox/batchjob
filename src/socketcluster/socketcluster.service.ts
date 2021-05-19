import { Injectable } from '@nestjs/common';

@Injectable()
export class SocketclusterService {
  uidChannels = [];
  http = require('http');
  socketClusterServer = require('socketcluster-server');
  options = {
  };
  httpServer = this.http.createServer();
  agServer = this.socketClusterServer.attach(this.httpServer, this.options);

  async startSocketClusterServer() {

    console.log('hello');
    const connections = [];

    (async () => {
      // Handle new inbound sockets.
      for await (let { socket } of this.agServer.listener('connection')) {
        connections.push(socket);
        connections.forEach(e => console.log('array' + e.id));
      
        // (async () => {
        //   // Set up a loop to handle remote transmitted events.
        //   for await (let data of socket.receiver('customRemoteEvent')) {
        //     // ...
        //     console.log(data + "channel data that received");
        //     this.uidChannels.push(data);
        //     console.log("received");

        //   }
        // })();

      }
    })();

    // port 8000
    this.httpServer.listen(8000);
  }

 async sendMessage(uidChannel: string,fileInfo:any) {
    console.log('messages Sended to client');
    console.log(uidChannel+" received channel "+JSON.stringify(fileInfo));
  await  this.agServer.exchange.transmitPublish(uidChannel, `File saved in the server succesfully with age limits higher than :${fileInfo.higher} and lower than :${fileInfo.lower}` );
  await  this.agServer.exchange.transmitPublish('customRemoteEvent', 'This is some data');
  }
}
