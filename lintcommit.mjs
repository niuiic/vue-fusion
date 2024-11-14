import { readFileSync } from 'fs'

const logFile = process.argv[2]
const msg = readFileSync(logFile).toString()

const regex = /(feat|fix|docs|refactor|test|chore)(?:\((.+)\))?: (.*)/

if (!regex.test(msg)) {
  console.error(
    [
      'git commit message does not conform to the established rules',
      regex.toString()
    ].join('\n')
  )
  process.exit(1)
}
