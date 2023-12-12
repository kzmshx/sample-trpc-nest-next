import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';

@Injectable()
export class TrpcRouter {
  /**
   * Define tRPC routes
   *
   * Currently, routes are all defined in one place, but when the app grows and we have more routes, it will be difficult to manage them all in one place.
   * We will want to split them up into multiple files.
   * Then we will use the `mergeRouters` method to combine them into one router.
   */
  appRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(
        z.object({
          name: z.string().optional(),
        }),
      )
      .query(({ input }) => {
        const { name } = input;
        return {
          greeting: `Hello, ${name ?? 'world'}!`,
        };
      }),
  });

  constructor(private readonly trpc: TrpcService) {}

  async applyMiddleware(app: INestApplication) {
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({ router: this.appRouter }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
