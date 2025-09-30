import { Module } from '@nestjs/common';

import { DrizzleModule } from '@/endpoints/drizzle/drizzle.module';
import { UserRepository } from '@/endpoints/repositories/user.repository';

import { AdminUserController } from './admin-users.controller';
import { AdminUserService } from './admin-users.service';

@Module({
  imports: [ DrizzleModule, ],
  providers: [ AdminUserService, UserRepository, ],
  controllers: [ AdminUserController, ],
  exports: [ AdminUserService, ],
})
export class AdminUserModule {}
