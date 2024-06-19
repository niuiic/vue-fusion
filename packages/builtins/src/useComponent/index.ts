export const useAsyncTask = <T>(promise: Promise<T>): [task: Promise<T>, start: () => Promise<void>] => {
  const handlers: any = {}

  const task = new Promise<T>((resolve, reject) => {
    handlers.resolve = resolve
    handlers.reject = reject
  })

  const start = () => promise.then((x) => handlers.resolve(x)).catch((e) => handlers.reject(e))

  return [task, start]
}
