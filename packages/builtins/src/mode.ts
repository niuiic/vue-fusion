type Mode = 'MOCK' | 'DEV'

const modeList: Mode[] = []

export const getModes = (): ReadonlyArray<Mode> => modeList

export const registerModes = (modes: Record<Mode, boolean>) => {
  modeList.length = 0
  for (const mode in modes) {
    if (modes[mode as Mode]) {
      modeList.push(mode as Mode)
    }
  }
}
