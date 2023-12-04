import type { GIcon } from './components/gIcon'

declare module 'vue' {
  export interface GlobalComponents {
    GIcon: typeof GIcon
  }
}
