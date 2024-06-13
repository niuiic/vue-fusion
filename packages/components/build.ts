import { readdirSync, rmSync, writeFileSync } from 'fs'
import { join } from 'path'
import { build } from 'vite'

const workDir = join(process.cwd(), 'src/components')
const exportFile = join(process.cwd(), 'src/index.ts')
const components = readdirSync(workDir)

const autoExport = () => {
  const exportContent = components.map((x) => `export * from './components/${x}'`).join('\n')
  writeFileSync(exportFile, exportContent)
}
autoExport()

build({
  configFile: join(process.cwd(), 'vite.lib.config.ts')
}).finally(() => rmSync(exportFile))
