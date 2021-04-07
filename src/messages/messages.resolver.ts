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
    async getTableById(@Args('id') id) {

        console.log(id);
          const query = gql`{
            vehicalById(id: "${id}") {
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
            console.log(JSON.stringify(data));
            return data.vehicalById;
        });
        
    }


    @Mutation()
    async updateRow(@Args('id') id,
    @Args('fname')fname, @Args('lname')lname, @Args('vid')vid, @Args('email')email) {
        console.log(id);

          const query = gql`mutation {
          updateVehicalById(
            input: {id: "${id}", vehicalPatch: {firstName: "${fname}", lastName: "${lname}", email: "${email}", vid: "${vid}"}}
          ) {
            vehical {
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
        }
      `;

        return await request('http://localhost:5000/graphql', query).then((data) => {
        console.log('________________')
        console.log(JSON.stringify(data));
            return data.updateVehicalById.vehical;
        });
        
    }

    
    @Mutation()
    async deleteVehicalById(@Args('id') id) {
        console.log(id);

          const query = gql`mutation {
            deleteVehicalById(input: { id: "${id}" }) {
              vehical{
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
          }
      `;

        return await request('http://localhost:5000/graphql', query).then((data) => {
        console.log('________________')
        console.log(JSON.stringify(data));
            return data.deleteVehicalById.vehical;
        });
        
    }
}

