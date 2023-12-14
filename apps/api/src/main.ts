import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { TrpcRouter } from './trpc/trpc.router';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Enable CORS so that the client can make requests to the API
  app.enableCors();

  // Apply the TRPC router to the app
  const trpc = app.get(TrpcRouter);
  await trpc.applyMiddleware(app);

  await app.listen(8080);
}

bootstrap();
