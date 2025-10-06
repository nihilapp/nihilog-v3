import { Module } from '@nestjs/common';

import { AdminCategoriesController } from '@/endpoints/admin/categories/admin-categories.controller';
import { AdminCategoriesService } from '@/endpoints/admin/categories/admin-categories.service';

@Module({
  controllers: [ AdminCategoriesController, ],
  providers: [ AdminCategoriesService, ],
  exports: [ AdminCategoriesService, ],
})
export class AdminCategoriesModule { }
