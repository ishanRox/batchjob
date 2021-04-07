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

    @Mutation()
    async getTable(@Args('offsetCount') offsetcount,@Args('first') first) {

        console.log(offsetcount);
      

          const query =   gql`{
            allVehicals( first:${first} offset:${offsetcount}  orderBy :MANUFACTURED_DATE_ASC) {
              nodes {
                id
                vid
                firstName
                lastName
                email
                carMake
                carModel
                vinNumber
                manufacturedDate
                ageOfVehicle
              }
            }
          }`;

        return await request('http://localhost:5000/graphql', query).then((data) => {
            console.log(data.allVehicals.nodes);
            return data.allVehicals.nodes;
        });
        
    }


    @Mutation()
    async getTableById(@Args('id')id) {

        console.log(id);
      

          const query = gql`{
            vehicalById(id: ${id}) {
              id
              vid
              firstName
              lastName
              email
              carMake
              carModel
              vinNumber
              manufacturedDate
              ageOfVehicle
            }
          }
            
        `;

        return await request('http://localhost:5000/graphql', query).then((data) => {
            console.log(data.allVehicals.nodes);
            return data.allVehicals.nodes;
        });
        
    }
}

