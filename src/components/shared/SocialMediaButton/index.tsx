import { ArrowRightIcon } from '@/assets/icons'
import { ISocialMediaButtonProps } from './SocialMediaButton.types'
import Link from 'next/link'
import React from 'react'
import { SimpleIcons } from '../SimpleIcons'
import styles from './SocialMediaButton.module.scss'

export const SocialMediaButton = ({
  link,
  backgroundColor,
  children,
  socialIcon,
  color,
  ...props
}: ISocialMediaButtonProps) => {
  return (
    <a href={link}>
      <button
        className={styles.social_media_button}
        {...props}
        style={{ background: backgroundColor, color }}
      >
        <SimpleIcons size={20} name={socialIcon} />
        {children}
        <ArrowRightIcon className={styles.social_media_button__socialArrow} />
      </button>
    </a>
  )
}
