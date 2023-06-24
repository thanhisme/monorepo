import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SocketIOAdapter } from './socket-io-adapter';

async function bootstrap() {
  const logger = new Logger('Main (main.ts)');
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Voting App Document')
    .setDescription(
      "This is an app using Socket IO for realtime tracking participants' choices",
    )
    .setVersion('1.0')
    .build();

  const configService = app.get(ConfigService);
  const port = parseInt(configService.get('PORT'));
  const document = SwaggerModule.createDocument(app, config);

  app.enableCors({
    origin: ['http://client'],
  });
  app.useWebSocketAdapter(new SocketIOAdapter(app, configService));

  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  logger.log(`Server running on port ${port}`);
}
bootstrap();
