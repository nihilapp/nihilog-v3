/**
 * Prisma 에러 코드 레퍼런스
 * @see https://www.prisma.io/docs/orm/reference/error-reference
 */
export const PRISMA_ERROR_CODE = {
  // ===== Common (P1000-P1999) =====
  P1000: 'P1000', // Authentication failed against database server
  P1001: 'P1001', // Can't reach database server
  P1002: 'P1002', // Database server was reached but timed out
  P1003: 'P1003', // Database does not exist
  P1008: 'P1008', // Operations timed out
  P1009: 'P1009', // Database already exists
  P1010: 'P1010', // User was denied access on the database
  P1011: 'P1011', // Error opening a TLS connection
  P1012: 'P1012', // Schema validation error
  P1013: 'P1013', // The provided database string is invalid
  P1014: 'P1014', // The underlying table for model does not exist
  P1015: 'P1015', // Your Prisma schema is using features that are not supported for the version of the database
  P1016: 'P1016', // Your raw query had an incorrect number of parameters
  P1017: 'P1017', // Server has closed the connection

  // ===== Prisma Client (Query Engine) (P2000-P2099) =====
  P2000: 'P2000', // The provided value for the column is too long for the column's type
  P2001: 'P2001', // The record searched for in the where condition does not exist
  P2002: 'P2002', // Unique constraint failed on the constraint
  P2003: 'P2003', // Foreign key constraint failed on the field
  P2004: 'P2004', // A constraint failed on the database
  P2005: 'P2005', // The value stored in the database for the field is invalid for the field's type
  P2006: 'P2006', // The provided value for model field is not valid
  P2007: 'P2007', // Data validation error
  P2008: 'P2008', // Failed to parse the query
  P2009: 'P2009', // Failed to validate the query
  P2010: 'P2010', // Raw query failed
  P2011: 'P2011', // Null constraint violation on the constraint
  P2012: 'P2012', // Missing a required value
  P2013: 'P2013', // Missing the required argument for field on object
  P2014: 'P2014', // The change you are trying to make would violate the required relation between the models
  P2015: 'P2015', // A related record could not be found
  P2016: 'P2016', // Query interpretation error
  P2017: 'P2017', // The records for relation between the models are not connected
  P2018: 'P2018', // The required connected records were not found
  P2019: 'P2019', // Input error
  P2020: 'P2020', // Value out of range for the type
  P2021: 'P2021', // The table does not exist in the current database
  P2022: 'P2022', // The column does not exist in the current database
  P2023: 'P2023', // Inconsistent column data
  P2024: 'P2024', // Timed out fetching a new connection from the connection pool
  P2025: 'P2025', // An operation failed because it depends on one or more records that were required but not found
  P2026: 'P2026', // The current database provider doesn't support a feature that the query used
  P2027: 'P2027', // Multiple errors occurred on the database during query execution
  P2028: 'P2028', // Transaction API error
  P2029: 'P2029', // Query parameter limit exceeded error
  P2030: 'P2030', // Cannot find a fulltext index to use for the search
  P2031: 'P2031', // Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set
  P2033: 'P2033', // A number used in the query does not fit into a 64 bit signed integer
  P2034: 'P2034', // Transaction failed due to a write conflict or a deadlock
  P2035: 'P2035', // Assertion violation on the database
  P2036: 'P2036', // Error in external connector
  P2037: 'P2037', // Too many database connections opened
} as const;

/**
 * Prisma 에러 코드 타입
 */
export type PrismaErrorCode = keyof typeof PRISMA_ERROR_CODE;

