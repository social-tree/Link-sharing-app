'use client'

import React, { useContext, useEffect, useMemo, useState } from 'react'

import { DataContext } from '@/Contexts/DataProvider'
import Image from 'next/image'
import styles from './profile.module.scss'
import { usePathname } from 'next/navigation'
import { userType } from '@/types/user'
import { SocialMediaButton } from '@/components/shared/SocialMediaButton'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import {
  TPlatformTypeWithLink,
  TPlatformTypeWithSeperateLink,
  TUserPlatformsType,
} from '@/types/Platform'
import { Button } from '@/components'
import { CheckboxChecked } from '@/assets/icons'

const Profile = () => {
  const pathname = usePathname()
  const supabase = createClientComponentClient<Database>()

  const [userInfo, setUserInfo] = useState<userType | null>(null)
  const [userPlatforms, setUserPlatforms] = useState<
    TPlatformTypeWithSeperateLink[] | null[]
  >([])
  const [savedUrlToClipboard, setSavedUrlToClipboard] = useState(false)

  const fullname = useMemo(
    () =>
      userInfo?.first_name && userInfo?.last_name
        ? `${userInfo?.first_name} ${userInfo?.last_name}`
        : ``,
    [userInfo?.first_name, userInfo?.last_name]
  )

  const { user, fields } = useContext(DataContext)

  const getUserInfoByNickname = async (nickname: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .textSearch('nickname', `${nickname}`, {
          type: 'plain',
          config: 'english',
        })
        .single()
      if (!data) return
      const userPlatforms = await supabase
        .from('users_platforms')
        .select('*, platform:platforms(*)')
        .eq('user_id', `${data?.id}`)

      setUserPlatforms(userPlatforms.data as TPlatformTypeWithSeperateLink[])
      setUserInfo(data)
    } catch (err) {
      console.error(err)
    }
  }

  const saveUrlToClipboard = () => {
    const baseURL = process.env.NEXT_PUBLIC_URL
    navigator.clipboard.writeText(`${baseURL}${userInfo?.nickname}`)
    setSavedUrlToClipboard(true)
    setTimeout(() => {
      setSavedUrlToClipboard(false)
    }, 3000)
  }

  useEffect(() => {
    if (pathname === '/preview') {
      setUserInfo(user)
    } else {
      const nickname = pathname.split('/')[1]
      getUserInfoByNickname(nickname)
    }
  }, [pathname])

  return (
    <div className={styles.profile_container}>
      <style global>{`
        body {
          padding: 0px !important;
        }
      `}</style>
      <header className={styles.profile_container__header}>
        <div className={styles.profile_container__header__wrap}>
          <Button
            style={
              savedUrlToClipboard
                ? { backgroundColor: '#52b963', color: 'white' }
                : {}
            }
            onClick={() => saveUrlToClipboard()}
            variant="primary"
          >
            {savedUrlToClipboard ? (
              <>
                <CheckboxChecked fill={'white'} width={20} height={20} />
                Saved URL To Clipboard
              </>
            ) : (
              'Share Profile'
            )}
          </Button>
        </div>
      </header>
      <div className={styles.profile_container__background} />
      <div className={styles.profile_container__wrap}>
        <Image
          width={104}
          height={104}
          alt="profile-image"
          src={userInfo?.avatar ? `${userInfo?.avatar}` : ``}
          className={styles.profile_container__img}
          priority={true}
        />
        <h1 className={styles.profile_container__name}>
          {fullname ? fullname : userInfo?.nickname}
        </h1>
        <div className={styles.profile_container__socialButtons}>
          {pathname === '/preview'
            ? fields?.map((field) => (
                <SocialMediaButton
                  backgroundColor={`${field?.platform?.background_color}`}
                  socialIcon={`${field?.platform?.icon_name}`}
                  color={`${field?.platform?.color}`}
                  link={`${field?.url}`}
                >
                  {field?.platform?.name}
                </SocialMediaButton>
              ))
            : userPlatforms?.map((field) => (
                <SocialMediaButton
                  backgroundColor={`${field?.platform?.background_color}`}
                  socialIcon={`${field?.platform?.icon_name}`}
                  color={`${field?.platform?.color}`}
                  link={`${field?.url}`}
                >
                  {field?.platform?.name}
                </SocialMediaButton>
              ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
