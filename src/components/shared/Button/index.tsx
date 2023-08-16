import { ArrowRightIcon } from '@/assets/icons'
import { IButtonProps } from './Button.types'
import { SimpleIcons } from '../SimpleIcons'
import classNames from 'classnames'
import styles from './Button.module.scss'

export function Button({
  children,
  variant,
  socialIcon,
  backgroundColor,
  ...props
}: IButtonProps) {
  const buttonClasses = classNames([styles.button], {
    [styles['button--primary']]: variant === 'primary',
    [styles['button--secondary']]: variant === 'secondary',
    [styles['button--socialMedia']]: variant === 'socialMedia',
  })

  return (
    <button
      style={{ background: backgroundColor }}
      className={`${buttonClasses}`}
      {...props}
    >
      {variant === 'socialMedia' ? (
        <>
          {socialIcon && <SimpleIcons size={20} name={socialIcon} />}
          {children}
          <ArrowRightIcon className={styles.button__socialArrow} />
        </>
      ) : (
        children
      )}
    </button>
  )
}
