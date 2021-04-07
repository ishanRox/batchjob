import { Injectable } from '@nestjs/common';
import { request, gql } from 'graphql-request';

@Injectable()
export class SendGqlReqService {

    async sendGqlReq(higher:string,lower:string){
        console.log(higher,lower);
        const query = gql`
        query{
         allVehicals( filter: {
             ageOfVehicle: {  greaterThanOrEqualTo: "${higher}"  lessThanOrEqualTo:"${lower}" }
           }){
              nodes{
                 firstName
                 lastName
                 email
                 carMake
                 carModel
                 vinNumber
                 manufacturedDate
                 ageOfVehicle
                 vid
              }
            }
          }
        `;
     
             return await request('http://localhost:5000/graphql', query).then((data) => {
                 console.log(data.allVehicals.nodes);
                 return data.allVehicals.nodes;
             });
    }
}
