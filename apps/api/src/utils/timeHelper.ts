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

  return targetDateTime.toFormat('yyyy-MM-dd HH:mm:ss');
}
