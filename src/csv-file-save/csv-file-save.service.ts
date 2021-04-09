import { Injectable } from '@nestjs/common';


@Injectable()
export class CsvFileSaveService {
    async saveCsvFile(): Promise<any> {
        console.log('file saving started');
        const json2csv = require('json2csv');
        const json = [
            {
                "car": "Audi",
                "price": 40000,
                "color": "blue"
            }, {
                "car": "BMW",
                "price": 35000,
                "color": "black"
            }, {
                "car": "Porsche",
                "price": 60000,
                "color": "green"
            }
        ];

        return json2csv.parseAsync({ data: json, fields: ['car', 'price', 'color'] }).then(csv => {
            
            require('fs').writeFile('pubmaticData.csv', csv, function (err) {
                if (err) throw err;
                console.log('File Saved!')
            });
        });

        }
}
