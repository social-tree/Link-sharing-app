import { TPlatformType } from '@/types'

export interface ISuggestionsProps {
  suggestions: TPlatformType[]
  handleSelectingItem: (link: TPlatformType, index: number) => void
  onChange: (link: string) => void
  focusedItemIndex: number
  value: string
}
