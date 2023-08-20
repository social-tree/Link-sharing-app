'use client'

import React, { useState } from 'react'

import { Button } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { SocialMediaButton } from '@/components/shared/SocialMediaButton'
import { TPlatformTypeWithLink } from '@/types/Platform'
import styles from './profile.module.scss'

const Profile = () => {
  const [platforms, setPlatforms] = useState<TPlatformTypeWithLink[]>([
    {
      background_color: '#1A1A1A',
      icon_name: 'SiGithub',
      name: 'GitHub',
      regex: '',
      url: 'https://github.com/',
    },
    {
      background_color: '#EE3939',
      icon_name: 'SiYoutube',
      name: 'YouTube',
      regex: '',
      url: 'https://youtube.com/',
    },
    {
      background_color: '#2D68FF',
      icon_name: 'SiLinkedin',
      name: 'LinkedIn',
      regex: '',
      url: 'https://linkedin.com/',
    },
    {
      background_color: '#333333',
      icon_name: 'SiDevdotto',
      name: 'Dev.to',
      regex: '',
      url: 'https://dev.to/',
    },
    {
      background_color: '#8A1A50',
      icon_name: 'SiCodewars',
      name: 'Codewars',
      regex: '',
      url: 'https://codewars.com/',
    },
    {
      background_color: '#302267',
      icon_name: 'SiFreecodecamp',
      name: 'FreeCodeCamp',
      regex: '',
      url: 'https://freecodecamp.com/',
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
          src={'https://i.imgur.com/bHRWEAr.jpg'}
          className={styles.profile_container__img}
          priority={true}
        />
        <h1 className={styles.profile_container__name}>Ben Wright</h1>
        <h4 className={styles.profile_container__email}>ben@example.com</h4>
        <div className={styles.profile_container__socialButtons}>
          {platforms.map((platform) => (
            <SocialMediaButton
              backgroundColor={platform.background_color}
              socialIcon={platform.icon_name}
              link={platform.url}
            >
              {platform.name}
            </SocialMediaButton>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
