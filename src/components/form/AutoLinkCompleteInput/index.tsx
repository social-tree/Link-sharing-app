'use client'

import React, { useEffect, useRef, useState } from 'react'

import { ChevronDownIcon } from '@/assets/icons'
import { Controller } from 'react-hook-form'
import { IAutoLinkCompleteInputProps } from './AutoLinkCompleteInput.types'
import { Input } from '..'
import { SimpleIcons } from '@/components/shared/SimpleIcons'
import { TPlatformType } from '@/types'
import classNames from 'classnames'
import styles from './AutoLinkCompleteInput.module.scss'

export const AutoLinkCompleteInput = ({
  links,
  name,
  control,
  inputProps,
  error,
  ...props
}: IAutoLinkCompleteInputProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    TPlatformType[]
  >([])

  const ref: any = useRef()

  const ChevArrowClasses = classNames({
    [styles.autocomplete__input_arrow]: true,
    [styles['autocomplete__input_arrow--active']]: showSuggestions,
  })

  const handleSuggestionFiltering = (text?: string) => {
    setFilteredSuggestions(
      links.filter(
        (link) => link?.name.toLowerCase().indexOf(`${text}`.toLowerCase()) > -1
      )
    )
  }

  const onInputChange = (text: string) => {
    handleSuggestionFiltering(text)
    setFocusedIndex(0)
    setSelectedIndex(-1)
  }

  const handleSelectingItem = (item: any, index: number) => {
    setSelectedIndex((prev) => (index === prev ? -1 : index))
  }

  useEffect(() => {
    // if the user clisk outside the input/suggestions, we hide suggestions
    const onClick = ({ target }: any) =>
      !ref.current?.contains(target) && setShowSuggestions(false)
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

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
              value={`${value?.includes('{') ? JSON?.parse(value)?.value : ``}`}
              leftIcon={
                selectedIndex >= 0 &&
                filteredSuggestions?.[selectedIndex]?.icon_name ? (
                  <SimpleIcons
                    size={16}
                    name={`${filteredSuggestions?.[selectedIndex]?.icon_name}`}
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
                if (e.key === 'ArrowDown')
                  setFocusedIndex((prev) =>
                    prev < filteredSuggestions.length - 1 ? prev + 1 : prev
                  )

                if (e.key === 'ArrowUp')
                  setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev))

                if (e.key == 'Enter') {
                  handleSelectingItem(
                    filteredSuggestions[focusedIndex],
                    focusedIndex
                  )
                  onChange(
                    focusedIndex === selectedIndex
                      ? JSON.stringify({ value: '', selected: {} })
                      : JSON.stringify({
                          value: filteredSuggestions[focusedIndex].name,
                          selected: filteredSuggestions[focusedIndex],
                        })
                  )
                }
              }}
              onFocus={(e) => {
                setShowSuggestions(true)
                handleSuggestionFiltering(e.target.value)
              }}
              onBlur={onBlur}
              onChange={(e) => {
                onInputChange(e.target.value)
                onChange(
                  JSON.stringify({
                    value: e.target.value,
                    selected: filteredSuggestions[focusedIndex],
                  })
                )
              }}
              {...inputProps}
            />
            {showSuggestions && (
              <ul className={styles.autocomplete__suggestions}>
                {filteredSuggestions?.map((link, index) => {
                  return (
                    <li
                      onKeyDown={(e) => console.log(e.key)}
                      key={link.name}
                      onClick={() => {
                        handleSelectingItem(link, index)
                        onChange(JSON.stringify(link))
                      }}
                      className={`${styles.autocomplete__suggestion_item} ${
                        index === focusedIndex
                          ? styles['autocomplete__suggestion_item--selected']
                          : ''
                      }`}
                    >
                      <SimpleIcons size={16} name={link.icon_name} />
                      <span className={styles.autocomplete__suggestion_name}>
                        {link.name}
                      </span>
                    </li>
                  )
                })}
              </ul>
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
