import { Module } from '@nestjs/common';

import { AdminSubscribeModule } from '@/endpoints/admin/subscribe/admin-subscribe.module';
import { UserRepository } from '@/endpoints/repositories/user.repository';
import { AdminController } from '@admin/admin.controller';
import { AdminService } from '@admin/admin.service';
import { PostsModule as AdminPostsModule } from '@admin/posts/admin-posts.module';
import { AdminUserModule } from '@admin/users/admin-users.module';
import { AuthModule } from '@auth/auth.module';
import { DrizzleModule } from '@drizzle/drizzle.module';

@Module({
  imports: [ AuthModule, DrizzleModule, AdminUserModule, AdminPostsModule, AdminSubscribeModule, ],
  controllers: [ AdminController, ],
  providers: [ AdminService, UserRepository, ],
})
export class AdminModule {}
