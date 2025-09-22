import { Module } from '@nestjs/common';
import { AuthModule } from '@auth/auth.module';
import { DrizzleModule } from '@drizzle/drizzle.module';
import { AdminController } from '@admin/admin.controller';
import { AdminService } from '@admin/admin.service';
import { UserRepository } from '@repositories/user.repository';
import { UsersModule } from '@admin/users/admin-users.module';
import { PostsModule as AdminPostsModule } from '@admin/posts/admin-posts.module';

@Module({
  imports: [ AuthModule, DrizzleModule, UsersModule, AdminPostsModule, ],
  controllers: [ AdminController, ],
  providers: [ AdminService, UserRepository, ],
})
export class AdminModule {}
