import { Injectable } from '@nestjs/common';
import { CsvFileSaveService } from 'src/csv-file-save/csv-file-save.service';
import { SendGqlReqService } from 'src/gql-request/send-gql-req.service';
import { SocketclusterService } from 'src/socketcluster/socketcluster.service';
import { WebsocketServerService } from 'src/websocket-server/websocket-server.service';

@Injectable()
export class BullJobService {
    Queue = require('bull');


    constructor(private socketServer: SocketclusterService, private csvSave: CsvFileSaveService, private gqlR: SendGqlReqService, private notification: WebsocketServerService) {
    }
    async saveCsvToServer(fileInfo): Promise<string> {
        console.log(JSON.stringify(fileInfo) + '  received query');
        var vs = this.csvSave;
        var gqlR = this.gqlR;
        var notification = this.notification;
        var saveCsvToServerQueue = new this.Queue('saveCsvToServer', 'redis://127.0.0.1:6379');
        var socketServer = this.socketServer;
        saveCsvToServerQueue.process(async function (job, done) {
            try {
                console.log(job.data);
                const result = await gqlR.sendGqlReq(job.data.higher, job.data.lower);
                await vs.saveCsvFile(result);
                await notification.broadcast(`${job.data.higher} to  ${job.data.lower} vehical age csv saved in server !`);
                socketServer.sendMessage(job.data.uidChannel,fileInfo);
                done(null, { status: result /* etc... */ });
            } catch (error) {
                console.log(error);
            }

        });

        const myJob = await saveCsvToServerQueue.add(fileInfo, { delay: 1000 });
        let statusObj = await myJob.finished();
        console.log(statusObj.status);
        return statusObj.status;

    }
}
