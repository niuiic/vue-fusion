export type NestedProperty<T, K extends string> = K extends ''
  ? T
  : K extends `${infer First}.${infer Rest}`
    ? T extends Record<string, any>
      ? First extends keyof T
        ? NestedProperty<T[First], Rest>
        : never
      : never
    : T extends Record<string, any>
      ? K extends keyof T
        ? T[K]
        : never
      : never
