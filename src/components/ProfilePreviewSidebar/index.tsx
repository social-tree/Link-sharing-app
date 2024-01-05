import { useContext, useMemo, useState } from 'react'

import { DataContext } from '@/Contexts/DataProvider'
import Image from 'next/image'
import styles from './ProfilePreviewSidebar.module.scss'
import { userType } from '@/types/user'
import { SocialMediaButton } from '../shared/SocialMediaButton'

export const ProfilePreviewSidebar = () => {
  const { user, watch, session } = useContext(DataContext)
  const formFullName =
    watch && (watch('first_name') || watch('last_name'))
      ? `${watch('first_name')} ${watch('last_name')}`
      : ``

  const formEmail = watch && watch('email')

  const fullname = useMemo(
    () =>
      formFullName
        ? formFullName
        : user?.first_name && user?.last_name
        ? `${user?.first_name} ${user?.last_name}`
        : ``,
    [(user?.first_name, user?.last_name, formFullName)]
  )

  const links = watch ? watch('links') : []

  return (
    <div className={styles.profile_preview_sidebar}>
      <div className={styles.profile_preview_sidebar__background} />
      <div className={styles.profile_preview_sidebar__wrap}>
        <Image
          width={104}
          height={104}
          alt="profile-image"
          src={
            watch && watch('avatar')
              ? watch('avatar')
              : user?.avatar
              ? `${user?.avatar}`
              : ``
          }
          className={styles.profile_preview_sidebar__img}
          priority={true}
        />
        <h1 className={styles.profile_preview_sidebar__name}>
          {fullname || user?.nickname}
        </h1>
        <h4 className={styles.profile_preview_sidebar__email}>
          {formEmail || session?.user.email}
        </h4>
        <ul className={styles.profile_preview_sidebar__links}>
          {links?.map((links) => (
            <li>
              <SocialMediaButton
                color={`${links?.platform?.color}`}
                link=""
                socialIcon={`${links?.platform?.icon_name}`}
                backgroundColor={`${links?.platform?.background_color}`}
              >
                {links?.platform?.name}
              </SocialMediaButton>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
