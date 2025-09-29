import { Module } from '@nestjs/common';

import { AdminSubscribeController } from '@/endpoints/admin/subscribe/admin-subscribe.controller';
import { AdminSubscribeService } from '@/endpoints/admin/subscribe/admin-subscribe.service';
import { SubscribeRepository } from '@/endpoints/repositories/subscribe.repository';
import { DrizzleModule } from '@drizzle/drizzle.module';

@Module({
  imports: [ DrizzleModule, ],
  providers: [ AdminSubscribeService, SubscribeRepository, ],
  controllers: [ AdminSubscribeController, ],
  exports: [ AdminSubscribeService, ],
})
export class AdminSubscribeModule {}
