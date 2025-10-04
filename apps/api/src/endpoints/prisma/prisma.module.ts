import { Global, Module } from '@nestjs/common';

import { PrismaService } from '@/endpoints/prisma/prisma.service';

export const PRISMA = Symbol('prisma_connection');

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: PRISMA,
      useExisting: PrismaService,
    },
  ],
  exports: [ PRISMA, PrismaService, ],
})
export class PrismaModule {}
