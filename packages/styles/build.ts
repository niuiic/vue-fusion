import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, rmdirSync, statSync } from 'fs'
import { join, normalize } from 'path'

const walkDirBackward = (path: string, cb: (name: string, path: string) => void) => {
  const fixedPath = normalize(path.replace(/\\/g, '/'))
  const children = readdirSync(fixedPath)

  children.forEach((child) => {
    const childPath = join(fixedPath, child)

    if (statSync(childPath).isDirectory()) {
      walkDirBackward(childPath, cb)
    } else {
      cb(child, childPath)
    }
  })

  cb(fixedPath.split('/').pop() ?? '', fixedPath)
}

const walkDirForward = (path: string, cb: (name: string, path: string) => void) => {
  const fixedPath = normalize(path.replace(/\\/g, '/'))
  const children = readdirSync(fixedPath)

  cb(fixedPath.split('/').pop() ?? '', fixedPath)

  children.forEach((child) => {
    const childPath = join(fixedPath, child)

    if (statSync(childPath).isDirectory()) {
      walkDirForward(childPath, cb)
    } else {
      cb(child, childPath)
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

walkDirForward(workDir, (_, path) => {
  if (statSync(path).isDirectory()) {
    mkdirSync(path.replace(workDir, targetDir))
  } else {
    copyFileSync(path, path.replace(workDir, targetDir))
  }
})
