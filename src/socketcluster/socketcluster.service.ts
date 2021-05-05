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
        // // SocketCluster/WebSocket connection handling loop.
        // async function sendData() {
        //   for await (let { socket } of agServer.listener('connection')) {

        (async () => {
          // Set up a loop to handle remote transmitted events.
          for await (let data of socket.receiver('customRemoteEvent')) {
            // ...
            console.log(data);
            this.uidChannels.push(data);
            console.log("received");

          }
        })();

        //   }
        // };

        // sendData();

      }
    })();


    // ... After the socket is created.





    // port 8000
    this.httpServer.listen(8000);
  }

  sendMessage() {
    console.log('messages Sended');
    // this.uidChannels.forEach(e=>{

    // this.agServer.exchange.transmitPublish(e, 'This is some data');
    // });

    this.agServer.exchange.transmitPublish(this.uidChannels[0], 'This is some data');
    this.agServer.exchange.transmitPublish('customRemoteEvent', 'This is some data');
  }
}
