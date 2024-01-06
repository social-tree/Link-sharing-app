'use client'

import {
  Close,
  HambugerIcon,
  LargeLogo,
  LinksHeaderIcon,
  ProfileDetailsHeaderIcon,
  SmallLogo,
} from 'icons'

import { DataContext } from '@/Contexts/DataProvider'
import { IHeaderProps } from './Header.types'
import Link from 'next/link'
import styles from './Header.module.scss'
import { useContext, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '..'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export const Header = ({ className, ...props }: IHeaderProps) => {
  const pathname = usePathname()
  const { session } = useContext(DataContext)
  const supabase = createClientComponentClient()
  const router = useRouter()
  const loggedIn = !!session
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const activeRouteClass = (path: string) =>
    pathname === path ? styles['nav__a--active'] : ''

  const handleLogOut = () => {
    supabase.auth.signOut()
    router.push('/')
  }

  return (
    <header className={`${styles.header} ${className}`} {...props}>
      <LargeLogo className={styles.large_logo} />
      <SmallLogo className={styles.small_logo} />
      {mobileMenuOpen && (
        <div className={styles.mobile_menu}>
          <Link
            className={`${styles.nav__a} ${activeRouteClass('/profile/links')}`}
            href="/profile/links"
          >
            <LinksHeaderIcon />
            Links
          </Link>
          <Link
            className={`${styles.nav__a} ${activeRouteClass(
              '/profile/details'
            )}`}
            href="/profile/details"
          >
            <ProfileDetailsHeaderIcon />
            Profile Details
          </Link>
          <Button onClick={() => handleLogOut()} variant="primary">
            Log Out
          </Button>
          <Link
            className={`${styles.nav__a} ${styles['nav__a--secondary']}`}
            href="/preview"
          >
            Preview
          </Link>
        </div>
      )}

      {loggedIn ? (
        <>
          <nav className={styles.nav}>
            <Link
              className={`${styles.nav__a} ${activeRouteClass(
                '/profile/links'
              )}`}
              href="/profile/links"
            >
              <LinksHeaderIcon />
              Links
            </Link>
            <Link
              className={`${styles.nav__a} ${activeRouteClass(
                '/profile/details'
              )}`}
              href="/profile/details"
            >
              <ProfileDetailsHeaderIcon />
              Profile Details
            </Link>
          </nav>

          <nav className={styles.right_nav}>
            <Button onClick={() => handleLogOut()} variant="primary">
              Log Out
            </Button>
            <Link
              className={`${styles.nav__a} ${styles['nav__a--secondary']}`}
              href="/preview"
            >
              Preview
            </Link>
          </nav>
          {mobileMenuOpen ? (
            <Close
              onClick={() => setMobileMenuOpen(false)}
              className={styles.nav__mobile_menu_icon}
            />
          ) : (
            <HambugerIcon
              onClick={() => setMobileMenuOpen(true)}
              className={styles.nav__mobile_menu_icon}
            />
          )}
        </>
      ) : (
        <nav className={styles.non_auth_nav}>
          <Link
            className={`${styles.nav__a} ${styles['nav__a--primary']}`}
            href="/login"
          >
            Login
          </Link>
          <Link
            className={`${styles.nav__a} ${styles['nav__a--secondary']}`}
            href="/register"
          >
            Sign up
          </Link>
        </nav>
      )}
    </header>
  )
}
