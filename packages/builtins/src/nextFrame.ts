export const nextFrame = (): Promise<undefined> => {
  const promise = new Promise<undefined>((resolve) => {
    requestAnimationFrame(() => resolve(undefined))
  })

  return promise
}
