let lastTime: number | undefined
let count = 0

export const localUniqId = (): string => {
  const now = new Date().getTime()

  if (lastTime === now) {
    count = count + 1
  } else {
    lastTime = now
    count = 0
  }

  return `${lastTime}${count}`
}
