import { createQueryKeys } from '@lukemorales/query-key-factory';

export const adminKeys = createQueryKeys('admin', {
  // POST Mutations
  signup: () => [ 'signup', ],
});
