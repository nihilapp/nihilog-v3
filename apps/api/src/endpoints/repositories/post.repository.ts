import { DRIZZLE } from '@drizzle/drizzle.module';
import { schemas } from '@drizzle/schemas';
import { Inject, Injectable } from '@nestjs/common';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class PostRepository {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: NodePgDatabase<typeof schemas>
  ) {}
}
