import { readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

export const collectDeps = () => {
  const rootDir = process.cwd()
  const parentPackageJson = join(rootDir, '..', 'package.json')

  if (!statSync(parentPackageJson).isFile()) {
    return
  }

  const data = JSON.parse(readFileSync(parentPackageJson).toString())
  const dependencies = {
    dependencies: data.dependencies,
    devDependencies: data.devDependencies
  }
  writeFileSync(join(rootDir, 'dependencies.json'), JSON.stringify(dependencies))
}
