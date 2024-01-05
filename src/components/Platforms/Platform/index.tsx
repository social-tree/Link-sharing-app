'use client'

import { AutoLinkCompleteInput, Input } from '@/components'

import { DragAndDropIcon } from '@/assets/icons'
import { TPlatformType } from '@/types'
import styles from './Platform.module.scss'
import { useDataContext } from '@/Contexts'
import { IPlatformProps } from './Platform.types'
import { useEffect } from 'react'

export function Platform({ id, i, field }: IPlatformProps) {
  const { control, notUsedPlatforms, register, remove, watch, errors } =
    useDataContext()
  const currentPlatform = watch && watch(`links[${i}]` as any)

  return (
    <div className={styles.platform}>
      <section className={styles.platform__section}>
        <div className={styles.platform__section__container}>
          <DragAndDropIcon />
          <p>Link #{i + 1}</p>
        </div>
        <button
          onClick={() => remove(i)}
          className={styles.platform__section__button}
        >
          Remove
        </button>
      </section>
      <fieldset className={styles.platform__fieldset}>
        <label className={styles.platform__fieldset__label}>Platform</label>
        <AutoLinkCompleteInput
          control={control}
          name={`links[${i}]`}
          links={notUsedPlatforms}
          defaultValue={currentPlatform?.platform}
        />
      </fieldset>
      <fieldset className={styles.platform__fieldset}>
        <label className={styles.platform__fieldset__label}>Link</label>
        {register && (
          <Input
            {...register(`links.${i}.url`, {
              pattern: currentPlatform?.platform?.regex
                ? {
                    value: new RegExp(currentPlatform.platform.regex),
                    message: 'link doesnt match the platform or is incorrect',
                  }
                : undefined,
            })}
            customError={errors?.links ? errors?.links[i]?.url?.message : null}
          />
        )}
      </fieldset>
    </div>
  )
}
