import { Module } from '@nestjs/common';
import { AuthModule } from '@/endpoints/auth/auth.module';
import { DrizzleModule } from '@/endpoints/drizzle/drizzle.module';
import { AdminController } from '@/endpoints/admin/admin.controller';
import { AdminService } from '@/endpoints/admin/admin.service';
import { UserRepository } from '@/endpoints/repositories/user.repository';
import { UsersModule } from '@/endpoints/admin/users/admin-users.module';
import { PostsModule as AdminPostsModule } from '@/endpoints/admin/posts/admin-posts.module';

@Module({
  imports: [ AuthModule, DrizzleModule, UsersModule, AdminPostsModule, ],
  controllers: [ AdminController, ],
  providers: [ AdminService, UserRepository, ],
})
export class AdminModule {}
