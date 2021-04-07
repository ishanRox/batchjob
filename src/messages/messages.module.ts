import { Module, OnModuleInit } from '@nestjs/common';
import { MessageResolver } from './messages.resolver';
const http = require("http");
const { postgraphile } = require("postgraphile");
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");
 
@Module({
    providers:[MessageResolver],
    exports:[MessageResolver]
})
export class MessagesModule implements OnModuleInit{
    onModuleInit() {
       
        http
          .createServer(
            postgraphile(
              process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/vehicaldata",
              "public",
              {
                watchPg: true,
                graphiql: true,
                enhanceGraphiql: true,
                appendPlugins: [ConnectionFilterPlugin],
              }
            )
          )
          .listen(process.env.PORT || 5000);
    }
}
