'use client'

import { ArrowBackIcon } from '@/assets/icons'
import Link from 'next/link'
import Lottie from 'lottie-react'
import animationData from '@/assets/animations/page-not-found.json'
import styles from './NotFound.module.scss'

export default function NotFound() {
  return (
    <main className={styles['not_found']}>
      <Lottie
        className={styles['not_found__lottie-animation']}
        animationData={animationData}
        loop
      />
      <div className={styles['not_found__content']}>
        <Link href="/" className={styles['not_found__content__link']}>
          <ArrowBackIcon />
          Go Back
        </Link>
      </div>
    </main>
  )
}
