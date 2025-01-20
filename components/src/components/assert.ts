export function assert(value: unknown, error: string | Error): asserts value {
  if (!value) {
    throw typeof error === 'string' ? new Error(error) : error
  }
}
