import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PRISMA_ERROR_CODE } from '@/code/prisma.code';
import { prismaResponse } from '@/utils/prismaResponse';

export function prismaError(error: PrismaClientKnownRequestError) {
  if (!(error instanceof PrismaClientKnownRequestError)) {
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'ERROR');
  }

  switch (error.code) {
  // ===== Common Errors (P1XXX) =====
  case PRISMA_ERROR_CODE.P1000:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'DB_CONNECTION_ERROR');
  case PRISMA_ERROR_CODE.P1001:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'DB_CONNECTION_ERROR');
  case PRISMA_ERROR_CODE.P1002:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'DB_CONNECTION_ERROR');
  case PRISMA_ERROR_CODE.P1003:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'DB_CONNECTION_ERROR');
  case PRISMA_ERROR_CODE.P1008:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'DB_QUERY_ERROR');
  case PRISMA_ERROR_CODE.P1009:
    return prismaResponse(false, null, 'CONFLICT', 'ALREADY_EXISTS');
  case PRISMA_ERROR_CODE.P1010:
    return prismaResponse(false, null, 'FORBIDDEN', 'PERMISSION_DENIED');
  case PRISMA_ERROR_CODE.P1011:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'DB_CONNECTION_ERROR');
  case PRISMA_ERROR_CODE.P1012:
    return prismaResponse(false, null, 'BAD_REQUEST', 'INVALID_REQUEST');
  case PRISMA_ERROR_CODE.P1013:
    return prismaResponse(false, null, 'BAD_REQUEST', 'INVALID_REQUEST');
  case PRISMA_ERROR_CODE.P1014:
    return prismaResponse(false, null, 'NOT_FOUND', 'NOT_FOUND');
  case PRISMA_ERROR_CODE.P1015:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'DB_QUERY_ERROR');
  case PRISMA_ERROR_CODE.P1016:
    return prismaResponse(false, null, 'BAD_REQUEST', 'INVALID_REQUEST');
  case PRISMA_ERROR_CODE.P1017:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'DB_CONNECTION_ERROR');

  // ===== Query Engine Errors (P2XXX) =====
  case PRISMA_ERROR_CODE.P2000:
    return prismaResponse(false, null, 'BAD_REQUEST', 'INVALID_REQUEST');
  case PRISMA_ERROR_CODE.P2001:
    return prismaResponse(false, null, 'NOT_FOUND', 'NOT_FOUND');
  case PRISMA_ERROR_CODE.P2002:
    return prismaResponse(false, null, 'CONFLICT', 'ALREADY_EXISTS');
  case PRISMA_ERROR_CODE.P2003:
    return prismaResponse(false, null, 'BAD_REQUEST', 'INVALID_REQUEST');
  case PRISMA_ERROR_CODE.P2004:
    return prismaResponse(false, null, 'BAD_REQUEST', 'INVALID_REQUEST');
  case PRISMA_ERROR_CODE.P2005:
    return prismaResponse(false, null, 'BAD_REQUEST', 'INVALID_REQUEST');
  case PRISMA_ERROR_CODE.P2006:
    return prismaResponse(false, null, 'BAD_REQUEST', 'INVALID_REQUEST');
  case PRISMA_ERROR_CODE.P2007:
    return prismaResponse(false, null, 'BAD_REQUEST', 'INVALID_REQUEST');
  case PRISMA_ERROR_CODE.P2008:
    return prismaResponse(false, null, 'BAD_REQUEST', 'INVALID_REQUEST');
  case PRISMA_ERROR_CODE.P2009:
    return prismaResponse(false, null, 'BAD_REQUEST', 'INVALID_REQUEST');
  case PRISMA_ERROR_CODE.P2010:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'DB_QUERY_ERROR');
  case PRISMA_ERROR_CODE.P2011:
    return prismaResponse(false, null, 'BAD_REQUEST', 'INVALID_REQUEST');
  case PRISMA_ERROR_CODE.P2012:
    return prismaResponse(false, null, 'BAD_REQUEST', 'INVALID_REQUEST');
  case PRISMA_ERROR_CODE.P2013:
    return prismaResponse(false, null, 'BAD_REQUEST', 'INVALID_REQUEST');
  case PRISMA_ERROR_CODE.P2014:
    return prismaResponse(false, null, 'BAD_REQUEST', 'INVALID_REQUEST');
  case PRISMA_ERROR_CODE.P2015:
    return prismaResponse(false, null, 'NOT_FOUND', 'NOT_FOUND');
  case PRISMA_ERROR_CODE.P2016:
    return prismaResponse(false, null, 'BAD_REQUEST', 'INVALID_REQUEST');
  case PRISMA_ERROR_CODE.P2017:
    return prismaResponse(false, null, 'BAD_REQUEST', 'INVALID_REQUEST');
  case PRISMA_ERROR_CODE.P2018:
    return prismaResponse(false, null, 'NOT_FOUND', 'NOT_FOUND');
  case PRISMA_ERROR_CODE.P2019:
    return prismaResponse(false, null, 'BAD_REQUEST', 'INVALID_REQUEST');
  case PRISMA_ERROR_CODE.P2020:
    return prismaResponse(false, null, 'BAD_REQUEST', 'INVALID_REQUEST');
  case PRISMA_ERROR_CODE.P2021:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'DB_QUERY_ERROR');
  case PRISMA_ERROR_CODE.P2022:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'DB_QUERY_ERROR');
  case PRISMA_ERROR_CODE.P2023:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'DB_QUERY_ERROR');
  case PRISMA_ERROR_CODE.P2024:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'DB_CONNECTION_ERROR');
  case PRISMA_ERROR_CODE.P2025:
    return prismaResponse(false, null, 'NOT_FOUND', 'NOT_FOUND');
  case PRISMA_ERROR_CODE.P2026:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'DB_QUERY_ERROR');
  case PRISMA_ERROR_CODE.P2027:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'DB_QUERY_ERROR');
  case PRISMA_ERROR_CODE.P2028:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'DB_QUERY_ERROR');
  case PRISMA_ERROR_CODE.P2029:
    return prismaResponse(false, null, 'BAD_REQUEST', 'INVALID_REQUEST');
  case PRISMA_ERROR_CODE.P2030:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'DB_QUERY_ERROR');
  case PRISMA_ERROR_CODE.P2031:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'DB_QUERY_ERROR');
  case PRISMA_ERROR_CODE.P2033:
    return prismaResponse(false, null, 'BAD_REQUEST', 'INVALID_REQUEST');
  case PRISMA_ERROR_CODE.P2034:
    return prismaResponse(false, null, 'CONFLICT', 'DB_QUERY_ERROR');
  case PRISMA_ERROR_CODE.P2035:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'DB_QUERY_ERROR');
  case PRISMA_ERROR_CODE.P2036:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'DB_QUERY_ERROR');
  case PRISMA_ERROR_CODE.P2037:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'DB_CONNECTION_ERROR');

  default:
    return prismaResponse(false, null, 'INTERNAL_SERVER_ERROR', 'ERROR');
  }
}
