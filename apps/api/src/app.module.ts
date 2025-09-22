import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AdminModule } from '@admin/admin.module';
import { AuthModule } from '@auth/auth.module';
import { DrizzleModule } from '@drizzle/drizzle.module';
import { PostsModule } from '@posts/posts.module';
import config from './conf/conf';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: config,
      isGlobal: true,
    }),
    DrizzleModule,
    ThrottlerModule.forRoot([ {
      ttl: 60000, // 1분
      limit: 60, // 60회
    }, ]),
    AuthModule,
    PostsModule,
    AdminModule,
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('nodemailer.host'),
          port: configService.get('nodemailer.port'),
          secure: configService.get('nodemailer.secure'),
          requireTLS: true,
          tls: {
            minVersion: 'TLSv1.2',
          },
          auth: {
            user: configService.get('nodemailer.auth.user'),
            pass: configService.get('nodemailer.auth.pass'),
          },
        },
        defaults: {
          from: `"No Reply" <${configService.get('nodemailer.auth.user')}>`,
        },
      }),
      inject: [ ConfigService, ],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
