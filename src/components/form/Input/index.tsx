import { InputProps } from './Input.types'
import styles from './Input.module.scss'

export const Input = ({ leftIcon, rightIcon, ...props }: InputProps) => {
  return (
    <div className={styles.container}>
      <label className={styles.container__input_wrap}>
        {leftIcon}
        <input className={styles.container__input} {...props} />
      </label>
      {rightIcon}
    </div>
  )
}
