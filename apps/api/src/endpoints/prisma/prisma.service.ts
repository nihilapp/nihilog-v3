import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { MESSAGE } from '@/code/messages';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super();
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log(MESSAGE.DB.CONNECTED);
    }
    catch (error) {
      this.logger.error(
        '데이터베이스 연결 실패:',
        error
      );
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log(MESSAGE.DB.DISCONNECTED);
    }
    catch (error) {
      this.logger.error(
        '데이터베이스 연결 해제 실패:',
        error
      );
    }
  }
}
