import { Module } from '@nestjs/common';

import { AdminUserController } from './admin-users.controller';
import { AdminUserService } from './admin-users.service';

@Module({
  providers: [ AdminUserService, ],
  controllers: [ AdminUserController, ],
  exports: [ AdminUserService, ],
})
export class AdminUserModule {}
