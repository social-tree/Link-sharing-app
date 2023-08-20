'use client'

import {
  LargeLogo,
  LinksHeaderIcon,
  ProfileDetailsHeaderIcon,
  SmallLogo,
} from 'icons'

import { IHeaderProps } from './Header.types'
import Link from 'next/link'
import styles from './Header.module.scss'
import { usePathname } from 'next/navigation'

export const Header = ({ className, ...props }: IHeaderProps) => {
  const pathname = usePathname()
  const loggedIn = false

  const activeRouteClass = (path: string) =>
    pathname === path ? styles['nav__a--active'] : ''

  return (
    <header className={`${styles.header} ${className}`} {...props}>
      <LargeLogo className={styles.large_logo} />
      <SmallLogo className={styles.small_logo} />

      {loggedIn ? (
        <>
          <nav className={styles.nav}>
            <Link
              className={`${styles.nav__a} ${activeRouteClass(
                '/profile/links'
              )}`}
              href="/"
            >
              <LinksHeaderIcon />
              Links
            </Link>
            <Link
              className={`${styles.nav__a} ${activeRouteClass(
                '/profile/details'
              )}`}
              href="/profile_details"
            >
              <ProfileDetailsHeaderIcon />
              Profile Details
            </Link>
          </nav>

          <nav>
            <Link
              className={`${styles.nav__a} ${styles['nav__a--secondary']}`}
              href="/preview"
            >
              Preview
            </Link>
          </nav>
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
