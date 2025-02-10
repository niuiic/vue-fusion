import { assert } from '../assert'

type Events = Record<string, (data: any) => any>

export class Emitter<T extends Events> {
  private handlers = new Map<string, ((data: any) => any)[]>()

  on<E extends keyof T>(event: E, handler: T[E]) {
    assert(typeof event === 'string', 'typeof event should be string')

    if (!this.handlers.has(event)) {
      this.handlers.set(event, [handler])
    } else {
      this.handlers.get(event)?.push(handler)
    }
  }

  off<E extends keyof T>(event: E, handler: T[E]) {
    assert(typeof event === 'string', 'typeof event should be string')

    const handlers = this.handlers.get(event)
    if (!handlers) {
      return
    }

    const index = handlers.indexOf(handler)
    if (index >= 0) {
      handlers.splice(index, 1)
    }
  }

  emit<E extends keyof T>(event: E, data: Parameters<T[E]>[0]): ReturnType<T[E]>[] {
    assert(typeof event === 'string', 'typeof event should be string')

    const handlers = this.handlers.get(event)
    assert(handlers, `event ${event} is not registered`)

    return handlers.map((fn) => fn(data))
  }

  once<E extends keyof T>(event: E, handler: T[E]) {
    assert(typeof event === 'string', 'typeof event should be string')

    const newHandler = ((data: unknown) => {
      this.off(event, newHandler)
      return handler(data)
    }) as T[E]
    this.on(event, newHandler)
  }

  dispose() {
    this.handlers.clear()
  }
}
