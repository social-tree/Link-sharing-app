'use client'

import { Platform } from './Platform'
import styles from './Platforms.module.scss'
import { useDataContext } from '@/Contexts'

export function Platforms() {
  const { fields } = useDataContext()

  return (
    <div className={styles.platforms}>
      {fields.map((field: any, i: number) => (
        <Platform {...{ field, i }} />
      ))}
    </div>
  )
}
