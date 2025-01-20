import { collectDeps } from 'dependencies'
import { join } from 'path'
import { build } from 'vite'

collectDeps()

build({
  configFile: join(process.cwd(), 'vite.config.ts')
}).catch(() => {})
