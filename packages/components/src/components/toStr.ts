export const toStr = (x: unknown): string => JSON.stringify(x, Object.getOwnPropertyNames(x), 1)
