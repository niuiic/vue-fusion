import { ElMessage } from 'element-plus'

export interface CodeProps {
  code: string
  language: string
  label: string
}

// ~~ notify
function notify(type: 'success' | 'warning' | 'error' | 'info', message: string): void
function notify(type: 'success' | 'warning' | 'error' | 'info'): (message: string) => void
function notify(
  type: 'success' | 'warning' | 'error' | 'info',
  message?: string
): undefined | ((message: string) => void) {
  if (message === undefined) {
    return (message) => notify(type, message)
  }

  ElMessage({
    message,
    type,
    showClose: true,
    dangerouslyUseHTMLString: true,
    grouping: true
  })
}

export { notify }
