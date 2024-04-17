import type { AnyFunction } from './function'
import type { AnyObject } from './object'

export type ComponentProps<T> = T extends abstract new (...args: any[]) => any ? InstanceType<T>['$props'] : AnyObject

export type ComponentEmits<T> = T extends abstract new (...args: any[]) => any ? InstanceType<T>['$emit'] : AnyFunction
