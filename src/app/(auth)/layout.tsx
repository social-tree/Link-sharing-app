import { ILayoutProps } from '@/types'
import { LargeLogo } from 'icons'
import styles from './auth.module.scss'

export default function AuthLayout({ children }: ILayoutProps) {
  return (
    <div className={styles.container}>
        <LargeLogo />
        {children}
    </div>
  )
}
