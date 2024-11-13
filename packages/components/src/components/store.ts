import type {
  _ExtractActionsFromSetupStore,
  _ExtractGettersFromSetupStore,
  _ExtractStateFromSetupStore,
  _GettersTree,
  _Method,
  DefineSetupStoreOptions,
  DefineStoreOptions,
  StateTree,
  Store,
  StoreDefinition
} from 'pinia'
import { createPinia, defineStore } from 'pinia'

export const pinia = createPinia()

declare interface SetupStoreHelpers {
  action: <Fn extends _Method>(fn: Fn) => Fn
}

function createStore<
  Id extends string,
  S extends StateTree = {},
  G extends _GettersTree<S> = {},
  A = {}
>(
  id: Id,
  options: Omit<DefineStoreOptions<Id, S, G, A>, 'id'>
): ReturnType<StoreDefinition<Id, S, G, A>>

/**
 * Creates a `useStore` function that retrieves the store instance
 *
 * @param options - options to define the store
 */
function createStore<
  Id extends string,
  S extends StateTree = {},
  G extends _GettersTree<S> = {},
  A = {}
>(
  options: DefineStoreOptions<Id, S, G, A>
): ReturnType<StoreDefinition<Id, S, G, A>>

/**
 * Creates a `useStore` function that retrieves the store instance
 *
 * @param id - id of the store (must be unique)
 * @param storeSetup - function that defines the store
 * @param options - extra options
 */
function createStore<Id extends string, SS>(
  id: Id,
  storeSetup: (helpers: SetupStoreHelpers) => SS,
  options?: DefineSetupStoreOptions<
    Id,
    _ExtractStateFromSetupStore<SS>,
    _ExtractGettersFromSetupStore<SS>,
    _ExtractActionsFromSetupStore<SS>
  >
): ReturnType<
  StoreDefinition<
    Id,
    _ExtractStateFromSetupStore<SS>,
    _ExtractGettersFromSetupStore<SS>,
    _ExtractActionsFromSetupStore<SS>
  >
>

function createStore(...args: any[]) {
  return (defineStore as Function)(...args)()
}

export const dropStore = (store: Store) => {
  store.$dispose()
  delete pinia.state.value[store.$id]
}

export { createStore }
