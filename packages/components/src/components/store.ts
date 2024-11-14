import type {
  _ExtractActionsFromSetupStore,
  _ExtractGettersFromSetupStore,
  _ExtractStateFromSetupStore,
  _GettersTree,
  _Method,
  DefineSetupStoreOptions,
  Store,
  StoreDefinition
} from 'pinia'
import { createPinia, defineStore } from 'pinia'
import { localUniqId } from './id'

export const pinia = createPinia()

declare interface SetupStoreHelpers {
  action: <Fn extends _Method>(fn: Fn) => Fn
}

const createStore = <SS>(
  storeSetup: (helpers: SetupStoreHelpers) => SS,
  options?: DefineSetupStoreOptions<
    string,
    _ExtractStateFromSetupStore<SS>,
    _ExtractGettersFromSetupStore<SS>,
    _ExtractActionsFromSetupStore<SS>
  >
): ReturnType<
  StoreDefinition<
    string,
    _ExtractStateFromSetupStore<SS>,
    _ExtractGettersFromSetupStore<SS>,
    _ExtractActionsFromSetupStore<SS>
  >
> => {
  const id = 'store-' + localUniqId()
  return defineStore(id, storeSetup, options)()
}

export const dropStore = (store: Store) => {
  store.$dispose()
  delete pinia.state.value[store.$id]
}

export { createStore }
