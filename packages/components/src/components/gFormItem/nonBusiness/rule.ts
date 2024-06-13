export const matchRegExp =
  (regExp: RegExp, err: string) =>
  (str: string): string | undefined =>
    typeof str === 'string' && regExp.test(str) ? undefined : err
