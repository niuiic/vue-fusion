import type { AnyObject } from '@/components/types'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults
} from 'axios'
import axios from 'axios'

export class Request {
  private instance: AxiosInstance

  public constructor(args: CreateAxiosDefaults) {
    this.instance = axios.create(args)
  }

  public async get<R>(url: string, options?: AxiosRequestConfig): Promise<R> {
    return this.instance.get(url, fixedOptions(options)).then(resolveResult)
  }

  public async post<R>(
    url: string,
    data?: AnyObject,
    options?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance
      .post(url, data, fixedOptions(options))
      .then(resolveResult)
  }

  public async rawGet<R>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return this.instance.get(url, fixedOptions(options))
  }

  public async rawPost<R>(
    url: string,
    data?: AnyObject,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return this.instance.post(url, data, fixedOptions(options))
  }
}

const fixedOptions = (
  options?: AxiosRequestConfig
): AxiosRequestConfig | undefined => {
  if (!options) {
    return
  }

  if (!options.params) {
    return options
  }

  return {
    ...options,
    params: Object.fromEntries(
      Object.entries(options.params).filter(([_, v]) => v !== undefined)
    )
  }
}

const resolveResult = (response?: AxiosResponse) => {
  if (response?.data?.code === 200) {
    return response.data.data
  }
  throw new Error(response?.data?.code)
}
