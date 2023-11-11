'use client'

import { Button, Header, ProfilePreviewSidebar } from 'components'

import { Fragment } from 'react'
import { ILayoutProps } from '@/types'
import { IProfileFormValues } from './profile.types'
import React from 'react'
import styles from './layout.module.scss'
import { useForm } from 'react-hook-form'

const ProfileLayout = ({ children }: ILayoutProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IProfileFormValues>()

  const handleFormSubmit = (data: IProfileFormValues) => {
    console.log(data)
  }

  return (
    <Fragment>
      <Header />
      <main className={styles.main}>
        <aside className={styles.main__aside}>
          <ProfilePreviewSidebar />
        </aside>
        <div className={styles.main__container}>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              register,
              errors,
            })
          })}
          <fieldset className={styles.main__container__fieldset}>
            <Button
              onClick={() => handleSubmit(handleFormSubmit)}
              disabled
              variant="primary"
            >
              Save
            </Button>
          </fieldset>
        </div>
      </main>
    </Fragment>
  )
}

export default ProfileLayout
