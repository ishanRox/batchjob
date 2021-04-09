import { Injectable, OnModuleInit } from '@nestjs/common';


@Injectable()
export class CsvFileSaveService implements OnModuleInit {

    fs = require('fs');
    dir = "./csvExports"
    onModuleInit() {
        if (!this.fs.existsSync(this.dir)) {
            this.fs.mkdirSync(this.dir);
        }
    }

    async saveCsvFile(data): Promise<any> {
        console.log('file saving started');
        const json2csv = require('json2csv');
        return json2csv.parseAsync({
            data: data, fields: ['id',
                'firstName',
                'lastName',
                'email',
                'carMake',
                'carModel',
                'vinNumber',
                'manufacturedDate',
                'ageOfVehicle',
                'vid']
        }).then(csv => {
            this.fs.writeFile(`./csvExports/${Date.now()}.csv`, csv, function (err) {
                if (err) throw err;
                console.log('File Saved!')
            });
        });

    }
}
