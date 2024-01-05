import { ISuggestionsProps } from './Suggestions.types'
import { SimpleIcons } from '@/components'
import styles from './Suggestions.module.scss'

export const Suggestions = ({
  suggestions,
  handleSelectingItem,
  onChange,
  focusedItemIndex,
  setSearchValue,
  value,
}: ISuggestionsProps) => {
  return (
    <ul className={styles.suggestions}>
      {suggestions?.map((suggestion, index) => {
        return (
          <li
            key={suggestion.id}
            onClick={() => {
              handleSelectingItem(suggestion, index)
              onChange({
                url: '',
                platform: suggestion,
              })
              setSearchValue(`${suggestion.name}`)
            }}
            className={`${styles.suggestions__suggestion_item} ${
              index === focusedItemIndex
                ? styles['suggestions__suggestion_item--selected']
                : ''
            }`}
          >
            <SimpleIcons size={16} name={`${suggestion.icon_name}`} />
            <span className={styles.suggestions__suggestion_name}>
              {suggestion.name}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
