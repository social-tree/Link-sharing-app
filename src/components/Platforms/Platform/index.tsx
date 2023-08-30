"use client";

import { AutoLinkCompleteInput, Input } from '@/components'

import { DragAndDropIcon } from '@/assets/icons'
import { TPlatformType } from '@/types'
import styles from './Platform.module.scss'
import { useDataContext } from '@/Contexts'

export function Platform({ i }: any) {
  
  const { control, platforms, register, remove } = useDataContext()

  return (
    <div className={styles.platform}>
      <section className={styles.platform__section}>
        <div className={styles.platform__section__container}>
          <DragAndDropIcon />
          <p>Link #{i}</p>
        </div>
        <button onClick={() => remove(i)} className={styles.platform__section__button}>Remove</button>
      </section>
      <fieldset className={styles.platform__fieldset}>
        <label className={styles.platform__fieldset__label}>Platform</label>
        <AutoLinkCompleteInput control={control} name={`Link #${i}`} links={platforms} />
      </fieldset>
      <fieldset className={styles.platform__fieldset}>
        <label className={styles.platform__fieldset__label}>Link</label>
        <Input {...register(`links.${i}.url`)} />
      </fieldset>
    </div>
  )
}
