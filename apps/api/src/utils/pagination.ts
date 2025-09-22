export function getLimitOffset(
  strtRow?: number,
  endRow?: number
): { limit: number | undefined; offset: number | undefined } {
  if (strtRow == null || endRow == null) {
    return { limit: undefined, offset: undefined, };
  }

  const start = Math.max(1, Math.trunc(strtRow));
  const end = Math.max(start, Math.trunc(endRow));

  return {
    limit: end - start + 1,
    offset: start - 1,
  };
}
