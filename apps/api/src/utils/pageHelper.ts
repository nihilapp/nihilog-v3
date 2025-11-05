export function pageHelper(
  page?: number,
  strtRow?: number,
  endRow?: number
): { limit: number | undefined;
  offset: number; } {
  if (page == null || endRow == null) {
    return {
      limit: undefined,
      offset: 0,
    };
  }

  const pagination = {
    startRow: 0,
    endRow: 0,
  };

  pagination.startRow = page > 0
    ? strtRow ?? 0
    : page * endRow;
  pagination.endRow = endRow;

  return {
    limit: pagination.endRow,
    offset: pagination.startRow,
  };
}
