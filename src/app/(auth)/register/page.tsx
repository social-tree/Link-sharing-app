'use client'

import { EmailIcon, PasswordIcon } from '@/assets/icons'

import { Button } from '@/components'
import { IRegisterFormValues } from './register.types'
import { Input } from '@/components'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import styles from '../auth.module.scss'
import { useForm } from 'react-hook-form'

const Register = () => {
  const supabase = createClientComponentClient()
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IRegisterFormValues>()

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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nickname } },
    })
    setError('password', { type: 'custom', message: error?.message })
  }

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
  )
}

export default Register
