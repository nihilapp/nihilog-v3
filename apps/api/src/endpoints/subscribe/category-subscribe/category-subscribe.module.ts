import { Module } from '@nestjs/common';

import { CategorySubscribeController } from './category-subscribe.controller';
import { CategorySubscribeService } from './category-subscribe.service';

@Module({
  controllers: [ CategorySubscribeController, ],
  providers: [ CategorySubscribeService, ],
  exports: [ CategorySubscribeService, ],
})
export class CategorySubscribeModule {}
