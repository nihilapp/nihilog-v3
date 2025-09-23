export function pageHelper(
  page?: number,
  endRow?: number
): { limit: number | undefined; offset: number | undefined } {
  if (page == null || endRow == null) {
    return { limit: undefined, offset: undefined, };
  }

  const calculatedStrtRow = page * endRow;
  const start = Math.max(0, Math.trunc(calculatedStrtRow));
  const end = Math.max(endRow, Math.trunc(endRow));

  return {
    limit: end,
    offset: start,
  };
}
