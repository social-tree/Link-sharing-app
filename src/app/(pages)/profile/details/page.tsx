'use client'

import { Input, UploadImage } from '@/components'

import { IProfileChildProps } from '../profile.types'
import React from 'react'
import styles from './details.module.scss'
import { useFormContext } from 'react-hook-form'
import { useDataContext } from '@/Contexts'

function Profile() {
  const { register, errors, watch, setValue } = useDataContext()

  if (!register) return

  return (
    <div className={styles.details}>
      <h1>Profile Details</h1>
      <p className={styles.details__description}>
        Add your details to create a personal touch to your profile.
      </p>
      <div className={styles.details__upload_image}>
        <p className={styles.details__upload_image__description}>
          Profile Picture
        </p>
        <div className={styles.details__upload_image__container}>
          <div className={styles.details__upload_image__pfp}>
            <UploadImage
              defaultImage={() => {
                const values = watch && watch('avatar')
                return `${values}`
              }}
              onChange={(file) => setValue && setValue('avatar', file)}
            />
          </div>
          <p className={styles.details__upload_image__container__description}>
            Image must be below 1024x1024px. Use PNG or JPG format.
          </p>
        </div>
      </div>
      <div className={styles.details__user_details}>
        <fieldset className={styles.details__user_details__fieldset}>
          <label className={styles.details__user_details__fieldset__label}>
            First name*
          </label>
          <Input
            error={errors}
            placeholder="e.g. John"
            {...register('first_name')}
            className={styles.details__user_details__fieldset__input}
          />
        </fieldset>
        <fieldset className={styles.details__user_details__fieldset}>
          <label className={styles.details__user_details__fieldset__label}>
            Last name*
          </label>
          <Input
            error={errors}
            placeholder="e.g. Appleseed"
            {...register('last_name')}
            className={styles.details__user_details__fieldset__input}
          />
        </fieldset>
        <fieldset className={styles.details__user_details__fieldset}>
          <label className={styles.details__user_details__fieldset__label}>
            Email
          </label>
          <Input
            error={errors}
            placeholder="e.g. email@example.com"
            {...register('email', {
              pattern: {
                value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm,
                message: 'Please enter a valid email',
              },
            })}
            type="email"
            className={styles.details__user_details__fieldset__input}
          />
        </fieldset>
      </div>
    </div>
  )
}

export default Profile
