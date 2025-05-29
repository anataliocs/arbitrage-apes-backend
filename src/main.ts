import 'reflect-metadata';
import { NestFactory } from '@nestjs/core/nest-factory';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:63343',
      'http://localhost:63342',
      'http://localhost:63342/stellar-arbitrage-apes-future-yacht-club/index.html',
    ],
    credentials: true,
    preflightContinue: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    exposedHeaders: ['Access-Control-Allow-Credentials', true],
    allowedHeaders: [
      'Access-Control-Allow-Headers',
      'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization',
      'Access-Control-Allow-Credentials',
      true,
    ],
  } as CorsOptions);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
