import { Prisma } from '@prisma/client';

type DateSeriesUnit = 'day' | 'week' | 'month' | 'year';

export function createDateSeries(
  startDt: string,
  endDt: string,
  unit: DateSeriesUnit
): Prisma.Sql {
  return Prisma.sql`
    date_series AS (
      SELECT
        generate_series(
          date_trunc(
            CASE WHEN ${unit} IN ('day', 'week', 'month', 'year')
              THEN ${unit}
              ELSE 'day'
            END,
            ${startDt}::timestamptz
          ),
          date_trunc(
            CASE WHEN ${unit} IN ('day', 'week', 'month', 'year')
              THEN ${unit}
              ELSE 'day'
            END,
            ${endDt}::timestamptz
          ),
          CASE ${unit}
            WHEN 'day' THEN interval '1 day'
            WHEN 'week' THEN interval '1 week'
            WHEN 'month' THEN interval '1 month'
            WHEN 'year' THEN interval '1 year'
            ELSE interval '1 day'
          END
        ) AS date_start
    )
    bucket AS (
      SELECT
          date_start
        , CASE ${unit}
            WHEN 'day' THEN date_start + INTERVAL '1 day'
            WHEN 'week' THEN date_start + INTERVAL '1 week'
            WHEN 'month' THEN date_start + INTERVAL '1 month'
            ELSE date_start + INTERVAL '1 day'
          END AS date_end
      FROM date_series
    )
  `;
}
