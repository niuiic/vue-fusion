export type Result<T> =
  | {
      ok: true
      data: T
    }
  | {
      ok: false
      err: string
    }

function ok(data?: undefined): Result<undefined>
function ok<T>(data: T): Result<T>
function ok<T = undefined>(data: T): Result<T> {
  return {
    ok: true,
    data
  }
}

function err<T>(err: string): Result<T> {
  return {
    ok: false,
    err
  }
}

export { err, ok }
