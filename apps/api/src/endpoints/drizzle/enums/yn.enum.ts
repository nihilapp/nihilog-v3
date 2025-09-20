import { pgEnum } from 'drizzle-orm/pg-core';
import { nihilogSchema } from '@/endpoints/drizzle/tables/nihilog.schema';

export const ynForNihillog = nihilogSchema.enum('yn_enum', [ 'Y', 'N', ]);

export const yn = pgEnum('yn_enum', [ 'Y', 'N', ]);
