const isCSS = (path: string) => new RegExp(/\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\?)/).test(path)

export const viteChunks = (id: string, { getModuleInfo }: { getModuleInfo: any }) => {
  if (isCSS(id)) {
    return 'style'
  }

  if (id.includes('node_modules')) {
    const packages = ['echarts', 'mapbox-gl', 'three', 'cesium', 'element-plus']
    return packages.find((x) => id.includes(x)) ?? 'vendor'
  }

  if (id.includes('src')) {
    const moduleInfo = getModuleInfo(id)
    if (moduleInfo.dynamicImporters.length + moduleInfo.importers.length > 1) {
      return 'manifest'
    }
  }
}
