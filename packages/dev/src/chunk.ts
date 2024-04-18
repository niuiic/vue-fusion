const isCSS = (filePath: string) => new RegExp(/\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\?)/).test(filePath)

export const viteChunks = (id: string, { getModuleInfo }: { getModuleInfo: any }) => {
  if (isCSS(id)) {
    return 'style'
  }

  if (id.includes('node_modules')) {
    if (id.includes('echarts')) {
      return 'echarts'
    }
    if (id.includes('mapbox-gl')) {
      return 'mapbox'
    }
    if (id.includes('element-plus')) {
      return 'element'
    }
  }

  if (id.includes('src')) {
    const moduleInfo = getModuleInfo(id)
    if (moduleInfo.dynamicImporters.length + moduleInfo.importers.length > 1) {
      return 'manifest'
    }
  }
}
