import { Module } from '@nestjs/common';

import { AdminTagSubscribeController } from '@/endpoints/admin/tag-subscribe/admin-tag-subscribe.controller';
import { TagSubscribeModule } from '@/endpoints/subscribe/tag-subscribe/tag-subscribe.module';

@Module({
  imports: [ TagSubscribeModule, ],
  controllers: [ AdminTagSubscribeController, ],
})
export class AdminTagSubscribeModule {}
