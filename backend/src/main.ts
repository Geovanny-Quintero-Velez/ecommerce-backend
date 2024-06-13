import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PATH_DEFAULT=""
  app.setGlobalPrefix(PATH_DEFAULT);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    }),
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('E-COMERCE example')
    .setDescription('The E-COMERCE API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);

}
bootstrap();
