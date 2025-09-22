export function updateColumns<T>(updateData: T): Partial<T> {
  const result: Partial<Record<string, unknown>> = {};
  for (const [ key, value, ] of Object.entries(updateData as Record<string, unknown>)) {
    if (value !== undefined) {
      result[key] = value;
    }
  }
  return result as Partial<T>;
}
