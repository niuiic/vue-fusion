function strategy<A, B extends A, R>(
  guard: (args: A) => args is B,
  impl: (args: B) => R
): [guard: (args: A) => args is B, impl: (args: B) => R]
function strategy<A, R>(
  guard: (args: A) => boolean,
  impl: (args: A) => R
): [guard: (args: A) => boolean, impl: (args: A) => R]
function strategy<A, B extends A, R>(guard: (args: A) => boolean, impl: (args: A | B) => R) {
  return [guard, impl]
}

function useStrategies<T extends string | symbol | number, A extends T, R>(
  strategies: Record<T, (args: A) => R>,
  args: A
): R
function useStrategies<T extends string | symbol | number, A extends T, R>(
  strategies: Record<T, (args: A) => R>
): (args: A) => R
function useStrategies<A, R>(strategies: [guard: (args: A) => boolean, impl: (args: any) => R][], args: A): R
function useStrategies<A, R>(strategies: [guard: (args: A) => boolean, impl: (args: any) => R][]): (args: A) => R
function useStrategies<T extends string | symbol | number, A, R>(
  strategies: [guard: (args: A) => boolean, impl: (args: any) => R][] | Record<T, (args: A) => R>,
  args?: A
): R | ((args: A) => R) {
  if (args === undefined) {
    return (args) => useStrategies(strategies as any, args) as R
  }

  if (Array.isArray(strategies)) {
    for (const strategy of strategies) {
      if (typeof strategy[0] === 'function' && strategy[0](args) && typeof strategy[1] === 'function') {
        return strategy[1](args)
      }
    }
  } else {
    const fn = strategies[args as unknown as keyof typeof strategies]
    if (fn && typeof fn === 'function') {
      return fn(args)
    }
  }

  throw new ReferenceError('useStrategies: the strategies do not fully cover all cases')
}

export { strategy, useStrategies }
