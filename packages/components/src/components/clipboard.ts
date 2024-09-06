export const copyToClipboard = async (text: string): Promise<unknown> => {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text)
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('style', 'width: 0; height: 0;')
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  return Promise.resolve()
    .then(() => document.execCommand('copy'))
    .finally(() => document.body.removeChild(textarea))
}
