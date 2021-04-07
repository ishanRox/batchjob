
import { Module } from '@nestjs/common';
import { SendGqlReqService } from './send-gql-req.service';

@Module({
   providers:[SendGqlReqService] ,
   exports:[SendGqlReqService]

})
export class GqlRequestModule {}
