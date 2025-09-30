import { Module } from '@nestjs/common';

import { AdminController } from '@/endpoints/admin/admin.controller';
import { AdminService } from '@/endpoints/admin/admin.service';
import { AdminCategorySubscribeModule } from '@/endpoints/admin/category-subscribe/admin-category-subscribe.module';
import { AdminPostsModule } from '@/endpoints/admin/posts/admin-posts.module';
import { AdminSubscribeModule } from '@/endpoints/admin/subscribe/admin-user-subscribe.module';
import { AdminUserModule } from '@/endpoints/admin/users/admin-users.module';
import { AuthModule } from '@/endpoints/auth/auth.module';
import { DrizzleModule } from '@/endpoints/drizzle/drizzle.module';
import { UserRepository } from '@/endpoints/repositories/user.repository';

@Module({
  imports: [ AuthModule, DrizzleModule, AdminUserModule, AdminPostsModule, AdminSubscribeModule, AdminCategorySubscribeModule, ],
  controllers: [ AdminController, ],
  providers: [ AdminService, UserRepository, ],
})
export class AdminModule {}
