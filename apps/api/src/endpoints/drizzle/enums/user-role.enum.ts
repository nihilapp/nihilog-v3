import { nihilogSchema } from '@/endpoints/drizzle/tables/nihilog.schema';
import { pgEnum } from 'drizzle-orm/pg-core';

export const userRole = pgEnum('user_role', [ 'USER', 'ADMIN', ]);

export const userRoleForNihillog = nihilogSchema.enum('user_role', [ 'USER', 'ADMIN', ]);
