import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { request, gql } from 'graphql-request';

@Resolver()
export class MessageResolver {
    msgIndb = [
        {
            id: 0,
            description: "message"
        }

    ];

    @Mutation()
    async createMessage(@Args('age') age: string) {
        const a = 9;
        console.log(age);

        const query = gql`
   query{
    allVehicals( filter: {
        ageOfVehicle: { greaterThan: "${age}" }
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

    @Query('messages')
    async getMessages(@Args('id') id) {

        console.log(id);


        return this.msgIndb;
    }
}

