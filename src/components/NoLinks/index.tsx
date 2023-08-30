import { EmptyIllustration } from '@/assets/icons'
import styles from './noLinks.module.scss'

export function NoLinks() {
  return (
    <article className={styles.no_links}>
      <EmptyIllustration />

      <h3 className={styles.no_links__title}>Let&apos;s get you started</h3>

      <p className={styles.no_links__description}>
        Use the &quot;Add new link&quot; button to get started. Once you have
        more than one link, you can reorder and edit them. We&apos;re here to
        help you share your profiles with everyone!
      </p>
    </article>
  )
}
