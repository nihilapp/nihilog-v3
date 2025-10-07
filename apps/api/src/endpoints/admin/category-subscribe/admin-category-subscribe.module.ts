import { Module } from '@nestjs/common';

import { AdminCategorySubscribeController } from '@/endpoints/admin/category-subscribe/admin-category-subscribe.controller';
import { CategorySubscribeModule } from '@/endpoints/subscribe/category-subscribe/category-subscribe.module';

@Module({
  imports: [ CategorySubscribeModule, ],
  controllers: [ AdminCategorySubscribeController, ],
})
export class AdminCategorySubscribeModule {}
