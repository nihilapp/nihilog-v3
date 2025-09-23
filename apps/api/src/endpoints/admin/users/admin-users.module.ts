import { Module } from '@nestjs/common';

import { DrizzleModule } from '@drizzle/drizzle.module';
import { UserRepository } from '@repositories/user.repository';

import { UsersController } from './admin-users.controller';
import { UsersService } from './admin-users.service';

@Module({
  imports: [ DrizzleModule, ],
  providers: [ UsersService, UserRepository, ],
  controllers: [ UsersController, ],
  exports: [ UsersService, ],
})
export class UsersModule {}
