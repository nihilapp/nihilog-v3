import { registerAs } from '@nestjs/config';

// JWT 설정 객체 (민감 정보)
export const jwtConfig = registerAs(
  'jwt',
  () => ({
    access: {
      secret: process.env.JWT_ACCESS_SECRET || 'default-access-secret',
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '1h',
    },
    refresh: {
      secret: process.env.JWT_REFRESH_SECRET || 'default-refresh-secret',
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
    },
  })
);

// Nodemailer 설정 객체 (민감 정보)
export const nodemailerConfig = registerAs(
  'nodemailer',
  () => ({
    host: process.env.NODEMAILER_HOST || 'smtp.naver.com',
    port: parseInt(
      process.env.NODEMAILER_PORT || '587',
      10
    ),
    secure: process.env.NODEMAILER_SECURE === 'true',
    auth: {
      user: process.env.NODEMAILER_USER || '',
      pass: process.env.NODEMAILER_PASS || '',
    },
  })
);

// 초기 관리자 설정 객체 (민감 정보)
export const initialAdminConfig = registerAs(
  'initialAdmin',
  () => ({
    email: process.env.INITIAL_ADMIN_EMAIL || 'admin@example.com',
    username: process.env.INITIAL_ADMIN_USERNAME || 'admin',
    password: process.env.INITIAL_ADMIN_PASSWORD || 'changeme123!',
  })
);

// 데이터베이스 설정 객체 (민감 정보)
export const databaseConfig = registerAs(
  'database',
  () => ({
    url: process.env.DATABASE_URL || '',
    directUrl: process.env.DIRECT_URL || '',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(
      process.env.DB_PORT || '5432',
      10
    ),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    name: process.env.DB_NAME || 'postgres',
  })
);

// 민감 정보 설정 객체들을 배열로 내보내기
export default [
  jwtConfig,
  nodemailerConfig,
  initialAdminConfig,
  databaseConfig,
];
