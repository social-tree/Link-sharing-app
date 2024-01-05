'use client'

import { Button, NoLinks, Platforms } from 'components'

import styles from './links.module.scss'
import { useDataContext } from '@/Contexts'

function Links() {
  const { fields, addLink, notUsedPlatforms } = useDataContext()

  return (
    <div className={styles.links}>
      <h1>Customize your links</h1>
      <p className={styles.links__description}>
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      <Button
        onClick={addLink}
        disabled={!notUsedPlatforms[0]}
        className={`${styles['links__button--add']}`}
        variant="secondary"
      >
        + Add new link
      </Button>

      {fields?.length == 0 ? <NoLinks /> : <Platforms />}
    </div>
  )
}

export default Links
