import { Module } from '@nestjs/common';

import { AdminController } from '@admin/admin.controller';
import { AdminService } from '@admin/admin.service';
import { PostsModule as AdminPostsModule } from '@admin/posts/admin-posts.module';
import { UsersModule } from '@admin/users/admin-users.module';
import { AuthModule } from '@auth/auth.module';
import { DrizzleModule } from '@drizzle/drizzle.module';
import { UserRepository } from '@repositories/user.repository';

@Module({
  imports: [ AuthModule, DrizzleModule, UsersModule, AdminPostsModule, ],
  controllers: [ AdminController, ],
  providers: [ AdminService, UserRepository, ],
})
export class AdminModule {}
