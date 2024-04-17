import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import type { Result } from 'fx-flow'
import { err, ok } from 'fx-flow'

type RequestData = Record<string | symbol | number, any>

axios.defaults.timeout = 10000

export class Fetch {
  public static async get<D>(url: string, options?: AxiosRequestConfig): Promise<Result<D>> {
    return await axios.get(url, options).then(
      (response) => okRes(response),
      (err) => errRes(err)
    )
  }

  public static async post<D>(url: string, data?: RequestData, options?: AxiosRequestConfig): Promise<Result<D>> {
    return await axios.post(url, data, options).then(
      (response) => okRes(response),
      (err) => errRes(err)
    )
  }

  public static async put<D>(url: string, data?: RequestData, options?: AxiosRequestConfig): Promise<Result<D>> {
    return await axios.put(url, data, options).then(
      (response) => okRes(response),
      (err) => errRes(err)
    )
  }

  public static async delete<D>(url: string, options?: AxiosRequestConfig): Promise<Result<D>> {
    return await axios.delete(url, options).then(
      (response) => okRes(response),
      (err) => errRes(err)
    )
  }

  public static async patch<D>(url: string, data?: RequestData, options?: AxiosRequestConfig): Promise<Result<D>> {
    return await axios.patch(url, data, options).then(
      (response) => okRes(response),
      (err) => errRes(err)
    )
  }

  private constructor() {}
}

const errRes = (error: any): Result<any> =>
  err(error?.response?.data?.code !== undefined ? String(error.response.data.code) : '')

const okRes = (response: any): Result<any> => {
  if (response?.data?.code === 200) {
    return ok(response.data.data)
  }
  return err(String(response?.data?.code))
}
