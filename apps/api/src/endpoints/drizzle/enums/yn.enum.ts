import { nihilogSchema } from '@drizzle/tables/nihilog.schema';

export const yn = nihilogSchema.enum('yn_enum', [ 'Y', 'N', ]);
