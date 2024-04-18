import type { AnyFunction, AnyObject } from 'fx-flow'

export type ComponentProps<T> = T extends abstract new (...args: any[]) => any ? InstanceType<T>['$props'] : AnyObject

export type ComponentEmits<T> = T extends abstract new (...args: any[]) => any ? InstanceType<T>['$emit'] : AnyFunction
