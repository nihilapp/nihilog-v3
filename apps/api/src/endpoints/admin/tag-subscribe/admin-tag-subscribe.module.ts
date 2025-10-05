import { Module } from '@nestjs/common';

import { AdminTagSubscribeController } from '@/endpoints/admin/tag-subscribe/admin-tag-subscribe.controller';
import { AdminTagSubscribeService } from '@/endpoints/admin/tag-subscribe/admin-tag-subscribe.service';

@Module({
  controllers: [ AdminTagSubscribeController, ],
  providers: [ AdminTagSubscribeService, ],
  exports: [ AdminTagSubscribeService, ],
})
export class AdminTagSubscribeModule {}
