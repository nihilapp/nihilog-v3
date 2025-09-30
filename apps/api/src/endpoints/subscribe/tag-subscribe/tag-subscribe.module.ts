import { Module } from '@nestjs/common';

import { TagSubscribeRepository } from '@/endpoints/repositories/tag-subscribe.repository';
import { TagSubscribeController } from '@/endpoints/subscribe/tag-subscribe/tag-subscribe.controller';
import { TagSubscribeService } from '@/endpoints/subscribe/tag-subscribe/tag-subscribe.service';

@Module({
  controllers: [ TagSubscribeController, ],
  providers: [ TagSubscribeService, TagSubscribeRepository, ],
  exports: [ TagSubscribeService, ],
})
export class TagSubscribeModule {}
