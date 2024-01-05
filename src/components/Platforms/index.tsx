'use client'

import { Platform } from './Platform'
import styles from './Platforms.module.scss'
import { useDataContext } from '@/Contexts'
import { TPlatformTypeWithSeperateLink } from '@/types/Platform'

export function Platforms() {
  const { fields } = useDataContext()

  return (
    <div className={styles.platforms}>
      {fields?.map((field: TPlatformTypeWithSeperateLink, i: number) => (
        <Platform key={field?.platform?.id} {...{ field, i }} />
      ))}
    </div>
  )
}
