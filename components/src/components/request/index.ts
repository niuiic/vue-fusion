import type { AnyObject } from '@/components/types'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import { isNil } from '../isNil'

const defaultCacheLifetime = 1000

interface CacheOptions {
  key: string
  lifetime?: number
}

export class Request {
  private instance: AxiosInstance
  private cache = new Map<
    string,
    {
      expiry: number
      promise: Promise<any>
    }
  >()

  public constructor(args: CreateAxiosDefaults) {
    this.instance = axios.create(args)
    setInterval(() => {
      this.cache.forEach((value, key) => {
        if (value.expiry < new Date().getTime()) {
          this.cache.delete(key)
        }
      })
    }, defaultCacheLifetime * 100)
  }

  public async get<R = any>(url: string, options?: AxiosRequestConfig, cacheOptions?: CacheOptions): Promise<R> {
    const request = () => this.instance.get(url, fixedOptions(options)).then(resolveResult)
    return this.cachedRequest(request, url, options, cacheOptions)
  }

  public async post<R = any>(
    url: string,
    data?: AnyObject,
    options?: AxiosRequestConfig,
    cacheOptions?: CacheOptions
  ): Promise<R> {
    const request = () => this.instance.post(url, data, fixedOptions(options)).then(resolveResult)
    return this.cachedRequest(request, url, options, cacheOptions)
  }

  public async rawGet<R = any>(
    url: string,
    options?: AxiosRequestConfig,
    cacheOptions?: CacheOptions
  ): Promise<AxiosResponse<R>> {
    const request = () => this.instance.get(url, fixedOptions(options))
    return this.cachedRequest(request, url, options, cacheOptions)
  }

  public async rawPost<R = any>(
    url: string,
    data?: AnyObject,
    options?: AxiosRequestConfig,
    cacheOptions?: CacheOptions
  ): Promise<AxiosResponse<R>> {
    const request = () => this.instance.post(url, data, fixedOptions(options))
    return this.cachedRequest(request, url, options, cacheOptions)
  }

  private async cachedRequest<R>(
    request: () => Promise<R>,
    url: string,
    options?: AxiosRequestConfig,
    cacheOptions?: CacheOptions
  ) {
    if (isNil(cacheOptions?.key)) {
      return request()
    }

    const cacheKey = getCacheKey(url, cacheOptions.key, options?.baseURL)
    const cachedPromise = this.getCachedPromise(cacheKey)
    if (!cachedPromise) {
      const promise = request()
      this.cache.set(cacheKey, {
        expiry: new Date().getTime() + (cacheOptions.lifetime ?? defaultCacheLifetime),
        promise
      })
      return promise
    }

    return cachedPromise
  }

  private getCachedPromise(cacheKey: string) {
    const cacheValue = this.cache.get(cacheKey)
    if (!cacheValue) {
      return
    }

    if (cacheValue.expiry < new Date().getTime()) {
      this.cache.delete(cacheKey)
      return
    }

    return cacheValue.promise
  }
}

const fixedOptions = (options?: AxiosRequestConfig): AxiosRequestConfig | undefined => {
  if (!options) {
    return
  }

  if (!options.params) {
    return options
  }

  return {
    ...options,
    params: Object.fromEntries(Object.entries(options.params).filter(([_, v]) => v !== undefined))
  }
}

const resolveResult = (response?: AxiosResponse) => {
  if (response?.data?.code === 200) {
    return response.data.data
  }
  throw new Error(response?.data?.code ?? '' + '@' + (response?.data?.msg ?? ''))
}

const getCacheKey = (url: string, key: string, baseURL?: string) => `${baseURL ?? '-'}:${url}:${key}`
