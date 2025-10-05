import { Module } from '@nestjs/common';

import { TagSubscribeController } from '@/endpoints/subscribe/tag-subscribe/tag-subscribe.controller';
import { TagSubscribeService } from '@/endpoints/subscribe/tag-subscribe/tag-subscribe.service';

@Module({
  controllers: [ TagSubscribeController, ],
  providers: [ TagSubscribeService, ],
  exports: [ TagSubscribeService, ],
})
export class TagSubscribeModule {}
