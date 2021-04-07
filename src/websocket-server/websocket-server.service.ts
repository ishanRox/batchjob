import { Injectable, OnModuleInit } from '@nestjs/common';
import * as WebSocket from 'ws';

@Injectable()
export class WebsocketServerService implements OnModuleInit {


    wss = new WebSocket.Server({ port: 8080 })


    onModuleInit() {
        console.log(`The module has been initialized.`);
        this.wss.on('connection', ws => {
            ws.on('message', message => {
                console.log(`Received message => ${message}`)
            })
            console.log('message sended');
          //  ws.send("hello");
        });
        
        
       
    }

    broadcast(msg) {
        console.log(msg);
        this.wss.clients.forEach(function each(client) {
            client.send(msg);
         });
     };

    sendNotifications(msg:string){
    
    }

}
