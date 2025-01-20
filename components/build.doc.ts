import { join } from 'path'
import { build } from 'vite'

build({
  configFile: join(process.cwd(), 'vite.config.ts')
}).catch(() => {})
