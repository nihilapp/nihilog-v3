import { Module } from '@nestjs/common';

import { AdminCategorySubscribeController } from '@/endpoints/admin/category-subscribe/admin-category-subscribe.controller';
import { AdminCategorySubscribeService } from '@/endpoints/admin/category-subscribe/admin-category-subscribe.service';

@Module({
  controllers: [ AdminCategorySubscribeController, ],
  providers: [ AdminCategorySubscribeService, ],
  exports: [ AdminCategorySubscribeService, ],
})
export class AdminCategorySubscribeModule {}
