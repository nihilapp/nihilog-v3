import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { PRISMA } from '@/endpoints/prisma/prisma.module';

@Injectable()
export class CategoryRepository {
  constructor(@Inject(PRISMA)
  private readonly prisma: PrismaClient) { }
}
