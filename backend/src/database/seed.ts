import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserSeeder } from './seeds/user.seed';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userSeeder = app.get(UserSeeder);
  await userSeeder.run();
  await app.close();
}

bootstrap();
