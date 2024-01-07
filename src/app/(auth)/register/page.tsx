'use client'

import { ClosedEye, EmailIcon, OpenEye, PasswordIcon } from '@/assets/icons'

import { Button } from '@/components'
import { IRegisterFormValues } from './register.types'
import { Input } from '@/components'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import styles from '../auth.module.scss'
import { useForm } from 'react-hook-form'
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import { useEffect, useState } from 'react'
import { env } from 'process'

const Register = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const username = searchParams.get('username')
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
  } = useForm<IRegisterFormValues>()
  const [showPassword, setShowPassword] = useState(false)

  const handleLoginSubmit = async ({
    email,
    password,
    confirmPassword,
    nickname,
  }: IRegisterFormValues) => {
    if (password !== confirmPassword) {
      setError('password', {
        type: 'custom',
        message: 'The passwords must match',
      })
      setError('confirmPassword', {
        type: 'custom',
        message: 'The passwords must match',
      })
      return
    }
    const baseURL = process.env.NEXT_PUBLIC_URL
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nickname },
        emailRedirectTo: `${baseURL}login`,
      },
    })
    data?.user?.email_confirmed_at && router.push('/profile/details')
    if (error?.message.toLocaleLowerCase().includes('nickname')) {
      setError('nickname', { type: 'custom', message: error?.message })
    } else {
      setError('password', { type: 'custom', message: error?.message })
    }
  }

  const toggleShowPassword = () => {
    setShowPassword((prev) => (prev ? false : true))
  }

  useEffect(() => {
    if (username) reset({ nickname: username })
  }, [username])

  return (
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
          placeholder="e.g. Alex"
          label="Username"
          type="nickname"
          {...register('nickname', { required: "Can't be empty" })}
        />
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
          type={showPassword ? 'text' : 'password'}
          rightIcon={
            showPassword ? (
              <OpenEye
                className={styles.passwordIcon}
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <ClosedEye
                className={styles.passwordIcon}
                onClick={() => toggleShowPassword()}
              />
            )
          }
          {...register('password', { required: 'Please check again' })}
        />
        <Input
          error={errors}
          leftIcon={<PasswordIcon />}
          placeholder="At least 8 characters"
          label="Confirm password"
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
          {...register('confirmPassword', { required: 'Please check again' })}
        />
      </div>
      <span className={styles.container__password_description}>
        Password must contain at least 8 characters
      </span>
      <Button variant="primary">Create an account</Button>
      <span className={styles.auth_description}>
        Already have an account?{' '}
        <Link className={'link'} href="/login">
          Login
        </Link>
      </span>
    </form>
  )
}

export default Register
