import { collectDeps } from 'dependencies'
import { existsSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'fs'
import { join } from 'path'
import { build } from 'vite'

const run = async () => {
  collectDeps()
  collectInput()
  await buildProject()
  updatePackageSettings()
}

let input = {}
const inputFile = join(process.cwd(), 'input')
const collectInput = () => {
  const componentsDir = join(process.cwd(), 'src/components')
  const components = readdirSync(componentsDir).map((x) => join(componentsDir, x))
  input = Object.fromEntries(
    components.map((x) => {
      if (statSync(x).isFile()) {
        return [getComponentName(x), x]
      }
      return [getComponentName(x), join(x, 'index.ts')]
    })
  )
  writeFileSync(inputFile, JSON.stringify(input))
}

const buildProject = () => build({ configFile: join(process.cwd(), 'vite.lib.config.ts') })

const updatePackageSettings = () => {
  const packageJson = join(process.cwd(), 'package.json')
  const projectSettings = JSON.parse(readFileSync(packageJson).toString())
  projectSettings.exports = Object.fromEntries(
    Object.keys(input).map((component) => {
      const typeFile = existsSync(join(process.cwd(), `dist/components/${component}`))
        ? `./dist/components/${component}/index.d.ts`
        : `./dist/components/${component}.d.ts`
      return [`./${component}`, { import: `./dist/js/${component}.mjs`, types: typeFile }]
    })
  )
  writeFileSync(packageJson, JSON.stringify(projectSettings, null, 2))
}

const getComponentName = (filePath: string) => filePath.split('/').pop()!.split('.')[0]

run()
  .finally(() => rmSync(inputFile))
  .catch(() => {})
