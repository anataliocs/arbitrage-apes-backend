import 'reflect-metadata';
import { NestFactory } from '@nestjs/core/nest-factory';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:63343'],
    credentials: true,
  } as CorsOptions);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
