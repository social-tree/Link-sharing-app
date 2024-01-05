import { InputProps } from './Input.types'
import React from 'react'
import classNames from 'classnames'
import styles from './Input.module.scss'

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon, rightIcon, label, error, name, customError, ...props }, ref) => {
    const errorMessage =
      customError || (error && name && error[name]?.message) || ''

    const inputContainerClassNames = classNames({
      [styles.container__input_container]: true,
      [styles['container__input_container--error']]: !!errorMessage,
    })
    const inputLabelClassNames = classNames({
      [styles.container__label]: true,
      [styles['container__label--error']]: !!errorMessage,
    })

    return (
      <div className={styles.container}>
        {label && <label className={inputLabelClassNames}>{label}</label>}
        <div className={inputContainerClassNames}>
          <label className={styles.container__input_wrap}>
            {leftIcon}
            <input
              ref={ref}
              className={styles.container__input}
              name={name}
              {...props}
            />
            {errorMessage && (
              <p className={styles.container__error}>{`${errorMessage}`}</p>
            )}
          </label>
          {rightIcon}
        </div>
      </div>
    )
  }
)
