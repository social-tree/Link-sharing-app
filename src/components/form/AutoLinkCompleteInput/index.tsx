'use client'

import React, { useRef, useState } from 'react'

import { ChevronDownIcon } from '@/assets/icons'
import { Controller } from 'react-hook-form'
import { IAutoLinkCompleteInputProps } from './AutoLinkCompleteInput.types'
import { Input } from '..'
import { SimpleIcons } from '@/components/shared/SimpleIcons'
import { Suggestions } from './Suggestions'
import { TPlatformType } from '@/types'
import classNames from 'classnames'
import styles from './AutoLinkCompleteInput.module.scss'
import { useOutsideClick } from '@/hooks/useOutsideClick'

export const AutoLinkCompleteInput = ({
  links,
  name,
  control,
  inputProps,
  error,
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
        (link) => link?.name.toLowerCase().indexOf(`${text}`.toLowerCase()) > -1
      )
    )
  }

  const onInputChange = (text: string) => {
    // reset filtering, focused link and selected link on text change
    handleSuggestionFiltering(text)
    setFocusedItemIndex(0)
    setSelectedItemIndex(-1)
    !showSuggestions && setShowSuggestions(true)
  }

  const handleSelectingItem = (item: any, index: number) => {
    // undo selection if the current selected item is selected again
    setSelectedItemIndex((prev) => (index === prev ? -1 : index))
    setShowSuggestions(false)
  }

  const handleNavigation = (key: string, onChange: (item: string) => void) => {
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

      // convert link to json so it can be sent back, if the current selected link is selected again then it will clear value
      onChange(
        focusedItemIndex === selectedItemIndex
          ? JSON.stringify({ value: '', selected: {} })
          : JSON.stringify({
              value: filteredSuggestions[focusedItemIndex].name,
              selected: filteredSuggestions[focusedItemIndex],
            })
      )
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      {...props}
      render={({ field: { name, onBlur, onChange, value } }) => (
        <div>
          <div ref={ref} className={styles.autocomplete}>
            <Input
              name={name}
              // check if the value has a selected link thats in JSON
              value={`${value?.includes('{') ? JSON?.parse(value)?.value : ``}`}
              // only add a left icon if a value is selected
              leftIcon={
                selectedItemIndex >= 0 &&
                filteredSuggestions?.[selectedItemIndex]?.icon_name ? (
                  <SimpleIcons
                    size={16}
                    name={`${filteredSuggestions?.[selectedItemIndex]?.icon_name}`}
                  />
                ) : null
              }
              rightIcon={
                <ChevronDownIcon
                  onClick={() =>
                    setShowSuggestions((prev) => (prev ? false : true))
                  }
                  className={ChevArrowClasses}
                />
              }
              onKeyDown={(e) => {
                handleNavigation(e.key, onChange)
              }}
              // show suggestions dropdown on focus
              onFocus={(e) => {
                setShowSuggestions(true)
                handleSuggestionFiltering(e.target.value)
              }}
              onBlur={onBlur}
              onChange={(e) => {
                onInputChange(e.target.value)
                // keep track of the user typed text in value and current selected link in selected
                onChange(
                  JSON.stringify({
                    value: e.target.value,
                    selected: filteredSuggestions[focusedItemIndex],
                  })
                )
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
              />
            )}
          </div>
          {error?.[name] && (
            <span className={styles.autocomplete__error}>
              {error?.[name].message}
            </span>
          )}
        </div>
      )}
    />
  )
}
