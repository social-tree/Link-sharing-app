'use client'

import React, { useContext, useEffect, useMemo, useState } from 'react'

import { DataContext } from '@/Contexts/DataProvider'
import Image from 'next/image'
import styles from './profile.module.scss'
import { usePathname } from 'next/navigation'
import { userType } from '@/types/user'

const Profile = () => {
  /*   const [platforms, setPlatforms] = useState<TPlatformTypeWithLink[]>([
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
  ]) */
  const pathname = usePathname()

  const [userInfo, setUserInfo] = useState<userType | null>(null)

  const fullname = useMemo(
    () =>
      userInfo?.first_name && userInfo?.last_name
        ? `${userInfo?.first_name} ${userInfo?.last_name}`
        : ``,
    [userInfo?.first_name, userInfo?.last_name]
  )

  const { user } = useContext(DataContext)

  useEffect(() => {
    if (pathname === '/preview') {
      setUserInfo(user)
    } else {
    }
  }, [pathname, user])

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
          src={user?.avatar ? `${user?.avatar}` : ``}
          className={styles.profile_container__img}
          priority={true}
        />
        <h1 className={styles.profile_container__name}>
          {fullname ? fullname : userInfo?.nickname}
        </h1>
        <h4 className={styles.profile_container__email}>ben@example.com</h4>
        <div className={styles.profile_container__socialButtons}>
          {/* {platforms.map((platform) => (
            <SocialMediaButton
              backgroundColor={platform.background_color}
              socialIcon={platform.icon_name}
              link={platform.url}
            >
              {platform.name}
            </SocialMediaButton>
          ))} */}
        </div>
      </div>
    </div>
  )
}

export default Profile
