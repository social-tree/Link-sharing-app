'use client'

import React, { useState } from 'react'

import { Button } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { TPlatformTypeWithLink } from '@/types/Platform'
import styles from './profile.module.scss'

const Profile = () => {
  const [platforms, setPlatforms] = useState<TPlatformTypeWithLink[]>([
    {
      background_color: '#1A1A1A',
      icon_name: 'SiGithub',
      name: 'GitHub',
      regex: '',
      link: 'https://github.com/',
    },
    {
      background_color: '#EE3939',
      icon_name: 'SiYoutube',
      name: 'YouTube',
      regex: '',
      link: 'https://youtube.com/',
    },
    {
      background_color: '#2D68FF',
      icon_name: 'SiLinkedin',
      name: 'LinkedIn',
      regex: '',
      link: 'https://linkedin.com/',
    },
  ])

  return (
    <div className={styles.profile_container}>
      <style global>{`
        body {
          padding: 0px !important;
        }
      `}</style>
      <div className={styles.profile_container__background} />
      <div className={styles.profile_container__wrap}>
        <Image
          width={104}
          height={104}
          alt="profile-image"
          src={'https://i.imgur.com/J9LeqZu.jpg'}
          className={styles.profile_container__img}
          priority={true}
        />
        <h1 className={styles.profile_container__name}>Ben Wright</h1>
        <h4 className={styles.profile_container__email}>ben@example.com</h4>
        <div className={styles.profile_container__socialButtons}>
          {platforms.map((platform) => (
            <Link href={platform.link}>
              <Button
                backgroundColor={platform.background_color}
                socialIcon={platform.icon_name}
                variant="socialMedia"
              >
                {platform.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
