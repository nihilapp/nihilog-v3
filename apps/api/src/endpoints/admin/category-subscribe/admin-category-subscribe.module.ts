import { Module } from '@nestjs/common';

import { AdminCategorySubscribeController } from '@/endpoints/admin/category-subscribe/admin-category-subscribe.controller';
import { AdminCategorySubscribeService } from '@/endpoints/admin/category-subscribe/admin-category-subscribe.service';
import { CategorySubscribeRepository } from '@/endpoints/repositories/category-subscribe.repository';

@Module({
  controllers: [ AdminCategorySubscribeController, ],
  providers: [ AdminCategorySubscribeService, CategorySubscribeRepository, ],
  exports: [ AdminCategorySubscribeService, ],
})
export class AdminCategorySubscribeModule {}
