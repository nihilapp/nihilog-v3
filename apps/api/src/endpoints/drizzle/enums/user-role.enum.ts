import { nihilogSchema } from '@drizzle/tables/nihilog.schema';

export const userRole = nihilogSchema.enum('user_role', [ 'USER', 'ADMIN', ]);
