import { IButtonProps } from './Button.types'
import styles from './Button.module.css'

function Button({ children, variant, ...props }: IButtonProps) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...props}>
      {children}
    </button>
  )
}

export default Button
