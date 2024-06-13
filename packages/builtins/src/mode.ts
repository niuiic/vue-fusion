type Mode = 'MOCK' | 'DEV'

let modeMap: Record<Mode, boolean> = { DEV: false, MOCK: false }

export const inMode = (mode: Mode) => modeMap[mode]

export const registerMode = (modes: Record<Mode, boolean>) => (modeMap = modes)
