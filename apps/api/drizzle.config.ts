import { defineConfig } from 'drizzle-kit';
import { loadYamlConfig } from './src/conf/conf';

function resolveDatabaseUrl(): string {
  const cfg = loadYamlConfig();
  const url = cfg.database?.url;
  if (typeof url === 'string' && url.trim().length > 0) {
    return url.trim();
  }
  throw new Error('config.yaml에서 database.url을 찾을 수 없습니다.');
}

export default defineConfig({
  schema: [
    './src/endpoints/drizzle/tables/**/*.ts',
    './src/endpoints/drizzle/enums/**/*.ts',
  ],
  out: './drizzle/nihilog',
  dialect: 'postgresql',
  schemaFilter: ['nihilog'],
  dbCredentials: {
    url: resolveDatabaseUrl(),
  },
  migrations: {
    schema: 'drizzle_nihilog',
    table: 'drizzle_nihilog_migrations',
  },
});
