import { Module } from '@nestjs/common';

import { PrismaModule } from '@/endpoints/prisma/prisma.module';
import { CategorySubscribeRepository } from '@/endpoints/repositories/category-subscribe.repository';
import { SubscribeRepository } from '@/endpoints/repositories/subscribe.repository';
import { TagSubscribeRepository } from '@/endpoints/repositories/tag-subscribe.repository';
import { UserRepository } from '@/endpoints/repositories/user.repository';
import { UserController } from '@/endpoints/users/users.controller';
import { UserService } from '@/endpoints/users/users.service';

@Module({
  imports: [ PrismaModule, ],
  providers: [
    UserService,
    UserRepository,
    SubscribeRepository,
    TagSubscribeRepository,
    CategorySubscribeRepository,
  ],
  controllers: [ UserController, ],
  exports: [ UserService, SubscribeRepository, ],
})
export class UserModule { }
