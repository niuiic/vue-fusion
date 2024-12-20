import { readdirSync, rmSync, writeFileSync } from 'fs'
import { join } from 'path'
import { build } from 'vite'

const componentDir = join(process.cwd(), 'src/components')
const styleDir = join(process.cwd(), 'src/styles')
const entryFile = join(process.cwd(), 'src/index.ts')

const generateEntryFile = () => {
  const components = readdirSync(componentDir)
  const exportContent = components.map((x) => `export * from './components/${x.split('.')[0]}'`).join('\n')

  const styles = readdirSync(styleDir)
  const importStylesContent = styles.map((x) => `import './styles/${x}'`).join('\n')
  writeFileSync(entryFile, [importStylesContent, exportContent].join('\n'))
}

generateEntryFile()

build({
  configFile: join(process.cwd(), 'vite.lib.config.ts')
})
  .finally(() => rmSync(entryFile))
  .catch(() => {})
