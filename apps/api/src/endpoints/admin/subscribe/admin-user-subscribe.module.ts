import { Module } from '@nestjs/common';

import { AdminSubscribeController } from '@/endpoints/admin/subscribe/admin-user-subscribe.controller';
import { AdminSubscribeService } from '@/endpoints/admin/subscribe/admin-user-subscribe.service';
import { PrismaModule } from '@/endpoints/prisma/prisma.module';
import { UserModule } from '@/endpoints/users/users.module';

@Module({
  imports: [ PrismaModule, UserModule, ],
  providers: [ AdminSubscribeService, ],
  controllers: [ AdminSubscribeController, ],
  exports: [ AdminSubscribeService, ],
})
export class AdminSubscribeModule {}
