import Image from 'next/image'
import React from 'react'
import { Button } from '..'
import styles from './User.module.scss'
import { IUserProps } from './User.types'
import Link from 'next/link'

export const User = ({ src, name }: IUserProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <Image width={100} height={100} src={src} alt="profile-image" />
        <p className={styles.wrap__name}>{name}</p>
        <Link href={`/${name}`}>
          <Button className={styles.wrap__button} variant="primary">
            Checkout Profile
          </Button>
        </Link>
      </div>
    </div>
  )
}
