import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as store from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { RedisClientOptions } from 'redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      useFactory: async (env: ConfigService) => {
        const host = env.get('REDIS_HOST');
        const port = env.get('REDIS_PORT');
        const ttl = env.get('TTL');

        return {
          store,
          host,
          port,
          ttl,
        };
      },
      inject: [ConfigService],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
