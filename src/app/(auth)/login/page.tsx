'use client'

import { ClosedEye, EmailIcon, OpenEye, PasswordIcon } from '@/assets/icons'

import { Button } from '@/components'
import { ILoginFormValues } from './login.types'
import { Input } from '@/components'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import styles from '../auth.module.scss'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Login = () => {
  const supabase = createClientComponentClient()

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
  } = useForm<ILoginFormValues>()
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()

  const handleLoginSubmit = async ({ email, password }: ILoginFormValues) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (data.user?.email_confirmed_at) {
      router.push('/profile/links')
    }
    setError('password', { type: 'custom', message: error?.message })
    const baseURL = process.env.NEXT_PUBLIC_URL
    if (error?.message === 'Email not confirmed') {
      const { data, error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${baseURL}login`,
        },
      })
    }
  }

  const toggleShowPassword = () => {
    setShowPassword((prev) => (prev ? false : true))
  }

  return (
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
          type={showPassword ? 'text' : 'password'}
          rightIcon={
            showPassword ? (
              <ClosedEye
                className={styles.passwordIcon}
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <OpenEye
                className={styles.passwordIcon}
                onClick={() => toggleShowPassword()}
              />
            )
          }
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
  )
}

export default Login
