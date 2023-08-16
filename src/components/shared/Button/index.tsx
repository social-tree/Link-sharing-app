import { ArrowRightIcon } from '@/assets/icons'
import { IButtonProps } from './Button.types'
import { SimpleIcons } from '../SimpleIcons'
import classNames from 'classnames'
import styles from './Button.module.scss'

export function Button({ children, variant, ...props }: IButtonProps) {
  const buttonClasses = classNames([styles.button], {
    [styles['button--primary']]: variant === 'primary',
    [styles['button--secondary']]: variant === 'secondary',
  })

  return (
    <button className={`${buttonClasses}`} {...props}>
      {children}
    </button>
  )
}
