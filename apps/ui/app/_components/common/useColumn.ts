export function useColumn<TData>(row: TData, key: keyof TData) {
  return row[key];
}
