import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, rmdirSync, statSync } from 'fs'
import { join, normalize } from 'path'

const walkDirBackward = (path: string, fn: (name: string, path: string) => void) => {
  const fixedPath = normalize(path.replace(/\\/g, '/'))
  const children = readdirSync(fixedPath)

  children.forEach((child) => {
    const childPath = join(fixedPath, child)

    if (statSync(childPath).isDirectory()) {
      walkDirBackward(childPath, fn)
    } else {
      fn(child, childPath)
    }
  })

  fn(fixedPath.split('/').pop() ?? '', fixedPath)
}

const walkDirForward = (path: string, fn: (name: string, path: string) => void) => {
  const fixedPath = normalize(path.replace(/\\/g, '/'))
  const children = readdirSync(fixedPath)

  fn(fixedPath.split('/').pop() ?? '', fixedPath)

  children.forEach((child) => {
    const childPath = join(fixedPath, child)

    if (statSync(childPath).isDirectory()) {
      walkDirForward(childPath, fn)
    } else {
      fn(child, childPath)
    }
  })
}

const workDir = join(process.cwd(), 'src', 'styles')
const targetDir = join(process.cwd(), 'dist')

if (existsSync(targetDir)) {
  walkDirBackward(targetDir, (_, path) => {
    if (statSync(path).isDirectory()) {
      rmdirSync(path)
    } else {
      rmSync(path)
    }
  })
}

const isCSS = (path: string) => new RegExp(/\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\?)/).test(path)

walkDirForward(workDir, (_, path) => {
  if (statSync(path).isDirectory()) {
    mkdirSync(path.replace(workDir, targetDir))
  } else if (isCSS(path)) {
    copyFileSync(path, path.replace(workDir, targetDir))
  }
})
