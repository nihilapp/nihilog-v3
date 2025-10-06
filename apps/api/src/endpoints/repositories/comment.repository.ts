import { Inject, Injectable } from '@nestjs/common';
import type { PrismaClient } from '@prisma/client';

import { PRISMA } from '@/endpoints/prisma/prisma.module';

@Injectable()
export class CommentRepository {
  constructor(@Inject(PRISMA)
  private readonly prisma: PrismaClient) { }
}
