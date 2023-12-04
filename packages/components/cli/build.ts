import { readdirSync, writeFileSync } from 'fs'
import { join } from 'path'

const getComponentNames = () => {
  const workDir = join(process.cwd(), 'src/components')
  return readdirSync(workDir)
}
const components = getComponentNames()

const indexTemplate = `import type { App } from 'vue'
#1

export default {
  install(app: App) {
    const components = [#2]

    components.forEach((x) =>
      app.component(
        x
          .__name!.replace(/([A-Z])([A-Z])/g, '$1-$2')
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .toLowerCase(),
        x
      )
    )
  }
}

#3
`

const toUpperCase = (str: string) => str.slice(0, 1).toUpperCase() + str.slice(1)

const autoExport = () => {
  const content = indexTemplate
    .replace('#1', components.map((x) => `import \{ ${toUpperCase(x)} \} from './components/${x}'`).join('\n'))
    .replace('#2', components.map((x) => toUpperCase(x)).join(', '))
    .replace('#3', components.map((x) => `export * from './components/${x}'`).join('\n'))
  writeFileSync(join(process.cwd(), 'src/index.ts'), content)
}
autoExport()

const typesTemplate = `#1

declare module 'vue' {
  export interface GlobalComponents {
#2
  }
}
`

const autoFillTypes = () => {
  const content = typesTemplate
    .replace('#1', components.map((x) => `import type \{ ${toUpperCase(x)} \} from './components/${x}'`).join('\n'))
    .replace('#2', components.map((x) => `    ${toUpperCase(x)}: typeof ${toUpperCase(x)}`).join('\n'))
  writeFileSync(join(process.cwd(), 'src/components.d.ts'), content)
}
autoFillTypes()
