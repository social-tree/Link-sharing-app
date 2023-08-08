import { InputProps } from './Input.types'
import styles from './Input.module.scss'

export const Input = ({ leftIcon, ...props }: InputProps) => {
  return (
    <label className={styles.container}>
      {leftIcon}
      <input className={styles.container__input} {...props} />
    </label>
  )
}
