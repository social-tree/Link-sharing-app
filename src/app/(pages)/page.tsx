'use client'

import { Button, Header, Input } from '@/components'

import Link from 'next/link'
import styles from './page.module.scss'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { User } from '@/components/User'
import { useEffect, useState } from 'react'
import { supabase } from '@/libs/Supabase'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import { userType } from '@/types/user'
import { Autoplay } from 'swiper/modules'

export default function Home() {
  const { register, handleSubmit } = useForm()
  const navigation = useRouter()
  const [users, setUsers] = useState<userType[] | null>(null)

  const getUsers = async () => {
    try {
      const { data, error } = await supabase.from('users').select('*').limit(5)
      setUsers(data)
    } catch (err) {
      console.log(err)
    }
  }

  const onFormSubmit = ({ username }: { username?: string }) =>
    navigation.push(`register${username ? `?username=${username}` : ''}`)

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <style global>{`
        body {
          padding: 0px !important;
        }
        `}</style>
      <main className={styles.main}>
        <div className={styles.header_container}>
          <Header className={styles.header} />
        </div>
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
        <section className={styles.users_section}>
          <h2 className={styles.users_section__title}>
            Checkout some of our users
          </h2>
          <Swiper
            modules={[Autoplay]}
            autoplay
            loop
            enabled
            spaceBetween={50}
            slidesPerView={1}
            breakpoints={{
              780: { slidesPerView: 3 },
              480: { slidesPerView: 2 },
            }}
            className={styles.users_section__swiper}
          >
            {users?.map((user) => (
              <SwiperSlide>
                <User name={`${user.nickname}`} src={`${user.avatar}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </main>
    </>
  )
}
