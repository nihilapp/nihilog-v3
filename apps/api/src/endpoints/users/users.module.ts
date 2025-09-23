import { Module } from '@nestjs/common';

import { DrizzleModule } from '@/endpoints/drizzle/drizzle.module';
import { UserRepository } from '@/endpoints/repositories/user.repository';
import { UserController } from '@/endpoints/users/users.controller';
import { UserService } from '@/endpoints/users/users.service';

@Module({
  imports: [ DrizzleModule, ],
  providers: [ UserService, UserRepository, ],
  controllers: [ UserController, ],
  exports: [ UserService, ],
})
export class UserModule { }
