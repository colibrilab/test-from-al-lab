import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerModule.setup(
    Config.swagger.url,
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle(Config.swagger.title)
        .setVersion(Config.swagger.ver)
        .build(),
    ),
    {
      swaggerOptions: {
        docExpansion: 'full"',
        displayRequestDuration: true,
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(Config.port);
}

bootstrap().then();
