import { Module } from '@nestjs/common';

import { CategorySubscribeRepository } from '@/endpoints/repositories/category-subscribe.repository';

import { CategorySubscribeController } from './category-subscribe.controller';
import { CategorySubscribeService } from './category-subscribe.service';

@Module({
  controllers: [ CategorySubscribeController, ],
  providers: [ CategorySubscribeService, CategorySubscribeRepository, ],
  exports: [ CategorySubscribeService, ],
})
export class CategorySubscribeModule {}
