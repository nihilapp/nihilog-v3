import { Module } from '@nestjs/common';

import { AdminTagsController } from '@/endpoints/admin/tags/admin-tags.controller';
import { AdminTagsService } from '@/endpoints/admin/tags/admin-tags.service';

@Module({
  controllers: [ AdminTagsController, ],
  providers: [ AdminTagsService, ],
  exports: [ AdminTagsService, ],
})
export class AdminTagsModule { }
