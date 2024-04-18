import type { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import type { AnyObject, Result } from 'fx-flow'
import { err, ok } from 'fx-flow'

type RequestData = AnyObject

export class Fetch {
  private instance: AxiosInstance

  public constructor(args: CreateAxiosDefaults) {
    this.instance = axios.create(args)
  }

  public async get<D>(url: string, options?: AxiosRequestConfig): Promise<Result<D>> {
    return await this.instance.get(url, options).then(
      (response) => okRes(response),
      (err) => errRes(err)
    )
  }

  public async post<D>(url: string, data?: RequestData, options?: AxiosRequestConfig): Promise<Result<D>> {
    return await this.instance.post(url, data, options).then(
      (response) => okRes(response),
      (err) => errRes(err)
    )
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
