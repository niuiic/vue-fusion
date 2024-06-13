import { readdirSync, rmSync, writeFileSync } from 'fs'
import { join } from 'path'
import { build } from 'vite'

const workDir = join(process.cwd(), 'src')
const exportFile = join(workDir, 'index.ts')
const modules = readdirSync(workDir)

const exportContent = modules.map((x) => `export * from './${x.split('.')[0]}'`).join('\n')
writeFileSync(exportFile, exportContent)

await build().finally(() => rmSync(exportFile))
