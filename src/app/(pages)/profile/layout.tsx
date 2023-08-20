import { ILayoutProps } from '@/types'
import styles from "./layout.module.scss"

const ProfileLayout = ({ children }: ILayoutProps) => {
  return (
    <main className={styles.main}>
      <aside className={styles.main__aside}>Platform Preview</aside>
      <div>{children}</div>
    </main>
  )
}

export default ProfileLayout
