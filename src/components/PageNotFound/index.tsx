'use client'

import { ArrowBackIcon } from '@/assets/icons'
import Link from 'next/link'
import Lottie from 'lottie-react'
import React from 'react'
import animationData from '@/assets/animations/page-not-found.json'
import styles from './PageNotFound.module.scss'

export function PageNotFound() {
  return (
    <main className={styles['page-not-found']}>
      <Lottie className={styles["page-not-found__lottie-animation"]} animationData={animationData} loop />
      <div className={styles['page-not-found__content']}>
        <Link href="/" className={styles['page-not-found__content__link']}>
          <ArrowBackIcon />
          Go Back
        </Link>
      </div>
    </main>
  )
}
