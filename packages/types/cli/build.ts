import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { build } from 'vite'

await build()

const outputFile = join(process.cwd(), 'dist/index.d.ts')

const output = readFileSync(outputFile, 'utf8')
writeFileSync(outputFile, output.replace(/export declare /g, '').replace(/export { }/g, ''))
