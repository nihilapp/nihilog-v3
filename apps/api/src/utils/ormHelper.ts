import { eq, like, SQL, AnyColumn } from 'drizzle-orm';
import type { PgTableWithColumns } from 'drizzle-orm/pg-core';

export function equals<T extends PgTableWithColumns<any>>(
  target: T,
  conditions: Record<string, any>
): (SQL | undefined)[] {
  return Object.entries(conditions)
    .filter(([ , value, ]) => value !== undefined)
    .map(([ key, value, ]) => {
      const column = (target as unknown as Record<string, AnyColumn>)[key];
      return column
        ? eq(column, value)
        : undefined;
    });
}

export function likes<T extends PgTableWithColumns<any>>(
  target: T,
  conditions: Record<string, string>
): (SQL | undefined)[] {
  return Object.entries(conditions)
    .filter(([ , value, ]) => value !== undefined && value.trim() !== '')
    .map(([ key, value, ]) => {
      const column = (target as unknown as Record<string, AnyColumn>)[key];
      return column
        ? like(column, `%${value}%`)
        : undefined;
    });
}

export function updateColumns<T>(updateData: T): Partial<T> {
  const result: Partial<Record<string, unknown>> = {};
  for (const [ key, value, ] of Object.entries(updateData as Record<string, unknown>)) {
    if (value !== undefined) {
      result[key] = value;
    }
  }
  return result as Partial<T>;
}
