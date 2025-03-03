import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PATH_DEFAULT="api/v1"
  app.setGlobalPrefix(PATH_DEFAULT);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    }),
  );

  app.enableCors();
  console.log(new Date())

  const config = new DocumentBuilder()
    .setTitle('Fooddy´s API')
    .setDescription('The E-COMERCE Fooddy´s API to manage users and products')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(8000);
  Logger.log(`🚀 Fooddy's eCommerce running on http://localhost:8000`, 'Bootstrap');

}
bootstrap();
