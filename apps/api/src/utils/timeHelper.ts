import { DateTime } from 'luxon';

export function timeToString(date?: Date | DateTime | string | null): string {
  let targetDateTime: DateTime;

  if (date) {
    if (date instanceof Date) {
      targetDateTime = DateTime.fromJSDate(date);
    }
    else if (typeof date === 'string') {
      targetDateTime = DateTime.fromISO(date);
    }
    else {
      targetDateTime = date;
    }
  }
  else {
    targetDateTime = DateTime.now();
  }

  // DB 기본 포맷과 일치: UTC, 초 단위, Z 접미사
  return targetDateTime.toUTC().toFormat('yyyy-MM-dd\'T\'HH:mm:ss\'Z\'');
}
