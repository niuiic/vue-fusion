export const viteHtml = (args: { [key: string]: string }) => {
  return {
    name: 'vite-plugin-html',
    transformIndexHtml: (html: string) => {
      let res = html
      const keys = Object.keys(args)
      keys.forEach((k) => {
        res = res.replace(k, args[k])
      })
      return res
    }
  }
}
