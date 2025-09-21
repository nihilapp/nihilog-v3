import { nihilogSchema } from '@/endpoints/drizzle/tables/nihilog.schema';

export const userRole = nihilogSchema.enum('user_role', [ 'USER', 'ADMIN', ]);
