import { Button, ProfilePreviewSidebar } from 'components'

import { ILayoutProps } from '@/types'
import styles from './layout.module.scss'

const ProfileLayout = ({ children }: ILayoutProps) => {
  return (
    <main className={styles.main}>
      <aside className={styles.main__aside}>
        <ProfilePreviewSidebar />
      </aside>
      <div className={styles.main__container}>
        {children}
        <fieldset className={styles.main__container__fieldset}>
          <Button disabled variant="primary">Save</Button>
        </fieldset>
      </div>
    </main>
  )
}

export default ProfileLayout
