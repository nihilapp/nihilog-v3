import { Module } from '@nestjs/common';

import { AdminTagSubscribeController } from '@/endpoints/admin/tag-subscribe/admin-tag-subscribe.controller';
import { AdminTagSubscribeService } from '@/endpoints/admin/tag-subscribe/admin-tag-subscribe.service';
import { TagSubscribeRepository } from '@/endpoints/repositories/tag-subscribe.repository';

@Module({
  controllers: [ AdminTagSubscribeController, ],
  providers: [ AdminTagSubscribeService, TagSubscribeRepository, ],
  exports: [ AdminTagSubscribeService, ],
})
export class AdminTagSubscribeModule {}
