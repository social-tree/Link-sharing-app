'use client'

import { EmailIcon, LargeLogo, PasswordIcon } from '@/assets/icons'

import { Button } from '@/components'
import { ILoginFormValues } from './login.types'
import { Input } from '@/components/form'
import Link from 'next/link'
import React from 'react'
import styles from './login.module.scss'
import { useForm } from 'react-hook-form'

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ILoginFormValues>()

  const handleLoginSubmit = (data: ILoginFormValues) => {
    console.log(data)
  }

  return (
    <div className={styles.container}>
      <LargeLogo />
      <form
        onSubmit={handleSubmit(handleLoginSubmit)}
        className={styles.container__auth_form}
      >
        <div className={styles.container__about_auth}>
          <h3 className={styles.container__title}>Login</h3>
          <p className={styles.container__description}>
            Add your details below to get back into the app
          </p>
        </div>
        <div className={styles.container__inputs}>
          <Input
            error={errors}
            leftIcon={<EmailIcon />}
            placeholder="e.g. alex@email.com"
            label="Email address"
            type="email"
            {...register('email', { required: "Can't be empty" })}
          />
          <Input
            error={errors}
            leftIcon={<PasswordIcon />}
            placeholder="Enter your password"
            label="Password"
            {...register('password', { required: 'Please check again' })}
          />
        </div>
        <Button variant="primary">Login</Button>
        <span className={styles.auth_description}>
          Don't have an account?{' '}
          <Link className={'link'} href="/register">
            Create account
          </Link>
        </span>
      </form>
    </div>
  )
}

export default Login
