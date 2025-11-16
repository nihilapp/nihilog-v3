import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

import { AdminModule } from '@/endpoints/admin/admin.module';
import { AdminCategorySubscribeModule } from '@/endpoints/admin/category-subscribe/admin-category-subscribe.module';
import { AdminCommentsModule } from '@/endpoints/admin/comments/admin-comments.module';
import { AdminPostsModule } from '@/endpoints/admin/posts/admin-posts.module';
import { AdminSubscribeModule } from '@/endpoints/admin/subscribe/admin-user-subscribe.module';
import { AdminTagSubscribeModule } from '@/endpoints/admin/tag-subscribe/admin-tag-subscribe.module';
import { AdminTagsModule } from '@/endpoints/admin/tags/admin-tags.module';
import { AdminUserModule } from '@/endpoints/admin/users/admin-users.module';
import { AuthModule } from '@/endpoints/auth/auth.module';
import { CategoriesModule } from '@/endpoints/categories/categories.module';
import { CommentsModule } from '@/endpoints/comments/comments.module';
import { PostsModule } from '@/endpoints/posts/posts.module';
import { PrismaModule } from '@/endpoints/prisma/prisma.module';
import { RepositoryModule } from '@/endpoints/repositories/repository.module';
import { CategorySubscribeModule } from '@/endpoints/subscribe/category-subscribe/category-subscribe.module';
import { TagSubscribeModule } from '@/endpoints/subscribe/tag-subscribe/tag-subscribe.module';
import { TagModule } from '@/endpoints/tags/tags.module';
import { UserModule } from '@/endpoints/users/users.module';

import sensitiveConfig from './config/sensitive.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: sensitiveConfig,
      isGlobal: true,
    }),
    PrismaModule,
    RepositoryModule,
    AuthModule,
    UserModule,
    PostsModule,
    TagModule,
    CommentsModule,
    CategoriesModule,
    CategorySubscribeModule,
    TagSubscribeModule,
    AdminModule,
    AdminUserModule,
    AdminPostsModule,
    AdminSubscribeModule,
    AdminCategorySubscribeModule,
    AdminTagSubscribeModule,
    AdminTagsModule,
    AdminCommentsModule,
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
  providers: [],
})
export class AppModule { }
