export const nextFrame = (): Promise<unknown> => {
  const promise = new Promise<unknown>((resolve) => {
    requestAnimationFrame(() => resolve(undefined))
  })

  return promise
}
