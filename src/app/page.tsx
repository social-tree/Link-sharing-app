'use client'

import { Button, Header, Input } from '@/components'

import Link from 'next/link'
import styles from './page.module.scss'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { register, handleSubmit } = useForm()
  const navigation = useRouter()

  const onFormSubmit = ({ username }: { username?: string }) =>
    navigation.push(`register${username ? `?username=${username}` : ''}`)

  return (
    <>
      <style global>{`
        body {
          padding: 0px !important;
        }
        `}</style>
      <main className={styles.main}>
        <Header className={styles.header} />
        <section className={styles.hero_section}>
          <div className={styles.hero_section__info}>
            <h1 className={styles.hero_section__title}>
              One profile for everything, everywhere
            </h1>
            <p className={styles.hero_section__description}>
              DevLinks is the ultimate platform for developers to connect,
              collaborate, and share important links in a centralized hub.
            </p>
            <form
              onSubmit={handleSubmit(onFormSubmit)}
              className={styles.hero_section__sign_up}
            >
              <Input
                {...register('username')}
                className={styles.hero_section__sign_up_input}
                leftIcon={
                  <label className={styles.hero_section__sign_up_label}>
                    devlinks.com/
                  </label>
                }
              />
              <Button
                type="submit"
                className={styles.hero_section__sign_up_button}
                variant="primary"
              >
                Claim your username
              </Button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}
