import { Module } from '@nestjs/common';

import { AdminSubscribeController } from '@/endpoints/admin/subscribe/admin-user-subscribe.controller';
import { AdminSubscribeService } from '@/endpoints/admin/subscribe/admin-user-subscribe.service';
import { UserModule } from '@/endpoints/users/users.module';

@Module({
  imports: [ UserModule, ],
  providers: [ AdminSubscribeService, ],
  controllers: [ AdminSubscribeController, ],
  exports: [ AdminSubscribeService, ],
})
export class AdminSubscribeModule {}
