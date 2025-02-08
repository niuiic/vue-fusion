import type { AsyncComponentLoader } from 'vue'
import type { CodeProps } from './components/code'

export interface Page {
  name: string
  component?: AsyncComponentLoader
  status: CompStatus[]
  author: string
  auditor?: string
  docs?: CodeProps[]
  category?: string
  tags?: string[]
  desc?: string
}

export const enum CompStatus {
  PendingReview,
  Approved,
  Rejected,
  Deprecated,
  Developing
}

export const compStatusLabel = {
  [CompStatus.Approved]: '审核通过',
  [CompStatus.PendingReview]: '待审核',
  [CompStatus.Deprecated]: '废弃',
  [CompStatus.Developing]: '开发中',
  [CompStatus.Rejected]: '审核不通过'
}

const modules = import.meta.glob(['./pages/*/index.ts', '!./pages/*/components/**/index.ts'])
export const queryPages = () =>
  Promise.all(Object.entries(modules).map(([k, v]) => v().then((x: any) => [k, x.default]))).then(
    Object.fromEntries
  ) as Promise<Record<string, Page>>
