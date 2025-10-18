export function pageHelper(
  page?: number,
  strtRow?: number,
  endRow?: number
): { limit: number | undefined;
  offset: number | undefined; } {
  if (page == null || endRow == null) {
    return {
      limit: undefined,
      offset: undefined,
    };
  }

  const pagination = {
    startRow: 0,
    endRow: 0,
  };

  pagination.startRow = page > 0
    ? strtRow
    : page * endRow;
  pagination.endRow = endRow;

  return {
    limit: pagination.endRow,
    offset: pagination.startRow,
  };
}
