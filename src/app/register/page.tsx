'use client'

import { EmailIcon, LargeLogo, PasswordIcon } from '@/assets/icons'

import { Button } from '@/components'
import { IRegisterFormValues } from './register.types'
import { Input } from '@/components/form'
import Link from 'next/link'
import React from 'react'
import styles from '@/app/login/login.module.scss'
import { useForm } from 'react-hook-form'

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegisterFormValues>()

  const handleLoginSubmit = (data: IRegisterFormValues) => {
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
          <h3 className={styles.container__title}>Create account</h3>
          <p className={styles.container__description}>
            Let’s get you started sharing your links!
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
            placeholder="At least 8 characters"
            label="Create password"
            {...register('password', { required: 'Please check again' })}
          />
          <Input
            error={errors}
            leftIcon={<PasswordIcon />}
            placeholder="At least 8 characters"
            label="Confirm password"
            {...register('confirmPassword', { required: 'Please check again' })}
          />
        </div>
        <span className={styles.container__password_description}>
          Password must contain at least 8 characters
        </span>
        <Button variant="primary">Login</Button>
        <span className={styles.auth_description}>
          Already have an account?{' '}
          <Link className={'link'} href="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  )
}

export default Register
