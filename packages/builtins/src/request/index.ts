import type { Result } from '@/result'
import { err, ok } from '@/result'
import { toStr } from '@/toStr'
import type { AnyObject } from '@/types'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios'
import axios from 'axios'

type RequestData = AnyObject

export class Request {
  private instance: AxiosInstance

  public constructor(args: CreateAxiosDefaults) {
    this.instance = axios.create(args)
  }

  public async get<D>(url: string, options?: AxiosRequestConfig): Promise<Result<D>> {
    return this.instance.get(url, fixedOptions(options)).then(okRes, errRes)
  }

  public async post<D>(url: string, data?: RequestData, options?: AxiosRequestConfig): Promise<Result<D>> {
    return this.instance.post(url, data, fixedOptions(options)).then(okRes, errRes)
  }

  public async rawGet<D>(url: string, options?: AxiosRequestConfig): Promise<Result<AxiosResponse<D>>> {
    return this.instance.get(url, fixedOptions(options)).then(
      (response) => ok(response),
      (e) => err(toStr(e))
    )
  }

  public async rawPost<D>(
    url: string,
    data?: RequestData,
    options?: AxiosRequestConfig
  ): Promise<Result<AxiosResponse<D>>> {
    return this.instance.post(url, data, fixedOptions(options)).then(
      (response) => ok(response),
      (e) => err(toStr(e))
    )
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

const errRes = (error: any): Result<any> =>
  err(error?.response?.data?.code !== undefined ? String(error.response.data.code) : '')

const okRes = (response: any): Result<any> => {
  if (response?.data?.code === 200) {
    return ok(response.data.data)
  }
  return err(String(response?.data?.code))
}
