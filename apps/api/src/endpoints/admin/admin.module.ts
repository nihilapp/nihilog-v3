import { Module } from '@nestjs/common';

import { AdminController } from '@/endpoints/admin/admin.controller';
import { AdminService } from '@/endpoints/admin/admin.service';
import { AuthModule } from '@/endpoints/auth/auth.module';

@Module({
  imports: [ AuthModule, ],
  controllers: [ AdminController, ],
  providers: [ AdminService, ],
})
export class AdminModule {}
