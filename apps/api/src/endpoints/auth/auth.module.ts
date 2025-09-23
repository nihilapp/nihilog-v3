import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MailerModule } from '@nestjs-modules/mailer';

import { UsersModule } from '@admin/users/admin-users.module';
import { DrizzleModule } from '@drizzle/drizzle.module';
import { UserRepository } from '@repositories/user.repository';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    MailerModule,
    DrizzleModule,
    PassportModule.register({ defaultStrategy: 'jwt', }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.access.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.access.expiresIn'),
        },
      }),
      inject: [ ConfigService, ],
    }),
  ],
  controllers: [ AuthController, ],
  providers: [ AuthService, JwtStrategy, UserRepository, ],
})
export class AuthModule { }
