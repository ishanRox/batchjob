import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws' //Add this line

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //  app.useWebSocketAdapter(new WsAdapter());
  await app.listen(3000);
}
bootstrap();
