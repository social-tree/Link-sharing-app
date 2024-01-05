import { TPlatformType } from '@/types'

export interface ISuggestionsProps {
  suggestions: TPlatformType[]
  handleSelectingItem: (link: TPlatformType, index: number) => void
  onChange: (item: { url: string; platform: TPlatformType }) => void
  focusedItemIndex: number
  value: string
  setSearchValue: (text: string) => void
}
