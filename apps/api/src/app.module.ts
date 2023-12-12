import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrpcService } from './trpc/trpc.service';
import { TrpcModule } from './trpc/trpc.module';

@Module({
  controllers: [AppController],
  providers: [AppService, TrpcService],
  imports: [TrpcModule],
})
export class AppModule {}
