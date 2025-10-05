import { Module } from '@nestjs/common';

import { TagController } from '@/endpoints/tags/tags.controller';
import { TagService } from '@/endpoints/tags/tags.service';

@Module({
  providers: [ TagService, ],
  controllers: [ TagController, ],
  exports: [ TagService, ],
})
export class TagModule { }
