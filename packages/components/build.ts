import { readdirSync, unlinkSync, writeFileSync } from 'fs'
import { join } from 'path'
import { build } from 'vite'

const workDir = join(process.cwd(), 'src/components')
const components = readdirSync(workDir)

const autoExport = () => {
  const content = components.map((x) => `export * from './components/${x}'`).join('\n')
  writeFileSync(join(process.cwd(), 'src/index.ts'), content)
}
autoExport()

await build({
  configFile: join(process.cwd(), 'vite.lib.config.ts')
})

unlinkSync(join(process.cwd(), 'src/index.ts'))
