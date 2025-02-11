import type { Component } from 'vue'

export const builtinComponents: Record<string, () => Promise<Component>> = {
  input: () => import('@/components/cInput/CInput.vue')
}
