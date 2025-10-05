import { Module } from '@nestjs/common';

import { UserController } from '@/endpoints/users/users.controller';
import { UserService } from '@/endpoints/users/users.service';

@Module({
  providers: [ UserService, ],
  controllers: [ UserController, ],
  exports: [ UserService, ],
})
export class UserModule { }
