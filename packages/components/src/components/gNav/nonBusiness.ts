export interface Entry {
  id: string
  label: string
  pos?: 'LEFT' | 'RIGHT'
  children?: Entry[]
}

const isChildEntryActived = (activedEntry: Entry, entry: Entry): boolean => {
  if (!entry.children) {
    return false
  }

  return entry.children.some((v) => v.id === activedEntry.id || isChildEntryActived(activedEntry, v))
}

export const useIsActivedEntry = (activedEntry: () => Entry | undefined) => {
  const isActivedEntry = (entry: Entry): boolean => {
    const actEntry = activedEntry()

    if (!actEntry) {
      return false
    }

    if (actEntry.id === entry.id) {
      return true
    }

    if (isChildEntryActived(actEntry, entry)) {
      return true
    }

    return false
  }

  return { isActivedEntry }
}
