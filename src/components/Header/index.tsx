'use client'

import { LargeLogo, LinksHeaderIcon, ProfileDetailsHeaderIcon } from 'icons'

import Link from 'next/link'
import styles from './Header.module.scss'
import { usePathname } from 'next/navigation'

function Header() {
  const pathname = usePathname()

  const activeRouteClass = (path: string) => pathname === path ? styles['nav__a--active'] : ''

  return (
    <header className={styles.header}>
      <LargeLogo />

      <nav className={styles.nav}>
        <Link className={`${styles.nav__a} ${activeRouteClass('/')}`} href="/">
          <LinksHeaderIcon />
          Links
        </Link>
        <Link
          className={`${styles.nav__a} ${activeRouteClass('/profile_details')}`}
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
    </header>
  )
}

export default Header
