type Mode = 'MOCK' | 'DEV'

const modeList: Mode[] = []

export const getModes = (): ReadonlyArray<Mode> => modeList

export const registerModes = (modes: (Mode | undefined)[]) => {
  modeList.length = 0
  new Set(modes).forEach((x) => x && modeList.push(x))
}
