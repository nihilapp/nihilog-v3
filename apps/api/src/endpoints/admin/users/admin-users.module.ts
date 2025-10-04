import { Module } from '@nestjs/common';

import { PrismaModule } from '@/endpoints/prisma/prisma.module';
import { UserRepository } from '@/endpoints/repositories/user.repository';

import { AdminUserController } from './admin-users.controller';
import { AdminUserService } from './admin-users.service';

@Module({
  imports: [ PrismaModule, ],
  providers: [ AdminUserService, UserRepository, ],
  controllers: [ AdminUserController, ],
  exports: [ AdminUserService, ],
})
export class AdminUserModule {}
