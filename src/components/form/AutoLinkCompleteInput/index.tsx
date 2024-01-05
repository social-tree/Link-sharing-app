'use client'

import React, { useEffect, useRef, useState } from 'react'

import { ChevronDownIcon } from '@/assets/icons'
import { Controller } from 'react-hook-form'
import { IAutoLinkCompleteInputProps } from './AutoLinkCompleteInput.types'
import { Input } from '../../'
import { SimpleIcons } from '@/components/shared/SimpleIcons'
import { Suggestions } from './Suggestions'
import { TPlatformType } from '@/types'
import classNames from 'classnames'
import styles from './AutoLinkCompleteInput.module.scss'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { TPlatformTypeWithSeperateLink } from '@/types/Platform'

export const AutoLinkCompleteInput = ({
  links,
  name,
  control,
  inputProps,
  error,
  defaultValue,
  ...props
}: IAutoLinkCompleteInputProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  // the current focused suggestion
  const [focusedItemIndex, setFocusedItemIndex] = useState(0)
  // the current selected suggestion (-1 means nothing is selected)
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1)
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    TPlatformType[]
  >([])

  const [searchValue, setSearchValue] = useState('')

  const ref: any = useRef()

  const handleOutsideClick = () => {
    setShowSuggestions(false)
  }

  useOutsideClick({ onOutsideClick: handleOutsideClick, containerRef: ref })

  const ChevArrowClasses = classNames({
    [styles.autocomplete__input_arrow]: true,
    [styles['autocomplete__input_arrow--active']]: showSuggestions,
  })

  const handleSuggestionFiltering = (text?: string) => {
    // filter suggestions based on the given text
    setFilteredSuggestions(
      links.filter(
        (link) =>
          link?.name &&
          link?.name.toLowerCase().indexOf(`${text}`.toLowerCase()) > -1
      )
    )
  }

  useEffect(() => {
    setSearchValue(defaultValue?.name)
  }, [defaultValue])

  const onInputChange = (text: string) => {
    // reset filtering, focused link and selected link on text change
    handleSuggestionFiltering(text)
    setFocusedItemIndex(0)
    setSelectedItemIndex(-1)
    setSearchValue(text)
    !showSuggestions && setShowSuggestions(true)
  }

  const handleSelectingItem = (item: any, index: number) => {
    // undo selection if the current selected item is selected again
    setSelectedItemIndex((prev) => (index === prev ? -1 : index))

    setShowSuggestions(false)
  }

  const handleNavigation = (
    key: string,
    onChange: (item: TPlatformTypeWithSeperateLink) => void
  ) => {
    // keyboard navigation (up/down with enter key)
    if (key === 'ArrowDown')
      setFocusedItemIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      )

    if (key === 'ArrowUp')
      setFocusedItemIndex((prev) => (prev > 0 ? prev - 1 : prev))

    if (key == 'Enter') {
      handleSelectingItem(
        filteredSuggestions[focusedItemIndex],
        focusedItemIndex
      )
      onChange({
        url: ``,
        platform: filteredSuggestions[focusedItemIndex],
      })
      setSearchValue(`${filteredSuggestions[focusedItemIndex]?.name}`)
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      {...props}
      defaultValue={JSON.stringify(defaultValue)}
      render={({ field: { name, onBlur, onChange, value } }) => {
        const selectedIcon =
          filteredSuggestions?.[selectedItemIndex]?.icon_name || ''

        return (
          <div>
            <div ref={ref} className={styles.autocomplete}>
              <Input
                name={name}
                // check if the value has a selected link thats in JSON
                value={searchValue}
                // only add a left icon if a value is selected
                leftIcon={
                  selectedItemIndex >= 0 && selectedIcon ? (
                    <SimpleIcons size={16} name={selectedIcon} />
                  ) : defaultValue ? (
                    <SimpleIcons size={16} name={defaultValue.icon_name} />
                  ) : null
                }
                rightIcon={
                  <ChevronDownIcon
                    onClick={() => {
                      setShowSuggestions((prev) => (prev ? false : true))
                      handleSuggestionFiltering(searchValue)
                    }}
                    className={ChevArrowClasses}
                  />
                }
                onKeyDown={(e) => {
                  handleNavigation(e.key, onChange)
                }}
                // show suggestions dropdown on focus
                onFocus={() => {
                  setShowSuggestions(true)
                  handleSuggestionFiltering(searchValue)
                }}
                onBlur={onBlur}
                onChange={(e) => {
                  onInputChange(e.target.value)
                }}
                {...inputProps}
              />
              {showSuggestions && (
                <Suggestions
                  focusedItemIndex={focusedItemIndex}
                  handleSelectingItem={handleSelectingItem}
                  suggestions={filteredSuggestions}
                  onChange={onChange}
                  value={value}
                  setSearchValue={setSearchValue}
                />
              )}
            </div>
            {error?.[name] && (
              <span className={styles.autocomplete__error}>
                {error?.[name].message}
              </span>
            )}
          </div>
        )
      }}
    />
  )
}
