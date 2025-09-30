import { Module } from '@nestjs/common';

import { AdminSubscribeController } from '@/endpoints/admin/subscribe/admin-user-subscribe.controller';
import { AdminSubscribeService } from '@/endpoints/admin/subscribe/admin-user-subscribe.service';
import { DrizzleModule } from '@/endpoints/drizzle/drizzle.module';
import { UserModule } from '@/endpoints/users/users.module';

@Module({
  imports: [ DrizzleModule, UserModule, ],
  providers: [ AdminSubscribeService, ],
  controllers: [ AdminSubscribeController, ],
  exports: [ AdminSubscribeService, ],
})
export class AdminSubscribeModule {}
