'use client'

import { Button, Header, ProfilePreviewSidebar } from 'components'
import { FormProvider, useForm } from 'react-hook-form'
import { Fragment, useContext, useEffect } from 'react'

import { DataContext } from '@/Contexts/DataProvider'
import { ILayoutProps } from '@/types'
import { IProfileFormValues } from './profile.types'
import React from 'react'
import { Ruthie } from 'next/font/google'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { decode } from 'base64-arraybuffer'
import styles from './layout.module.scss'
import { usePathname } from 'next/navigation'
import { TFormFields } from '@/Contexts/DataProvider/DataProvider.types'
import { useRouter } from 'next/navigation'

const ProfileLayout = ({ children }: ILayoutProps) => {
  const formMethods = useForm<IProfileFormValues>({
    defaultValues: {
      avatar: '',
      email: '',
      first_name: '',
      last_name: '',
    },
  })
  const { user, reset, handleSubmit, clearErrors, session, setError, errors } =
    useContext(DataContext)
  const pathname = usePathname()
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleFormSubmit = async ({
    avatar,
    email,
    ...formData
  }: TFormFields) => {
    if (pathname === '/profile/links') {
      const data = await supabase.rpc('insert_user_platforms', {
        links: formData.links,
      })
      return
    }

    const formattedData = {
      avatar: '',
      email: '',
      first_name: '',
      last_name: '',
    }
    if (formData?.first_name !== user?.first_name) {
      formattedData.first_name = formData?.first_name
    }

    if (formData?.last_name !== user?.last_name) {
      formattedData.last_name = formData?.last_name
    }
    if (email !== session?.user?.email) {
      formattedData.email = email
    }
    if (avatar !== user?.avatar) {
      formattedData.avatar = avatar
    }

    if (
      !formattedData.email &&
      !formattedData.avatar &&
      !formattedData.first_name &&
      !formattedData.last_name
    ) {
      console.log(formattedData)
      setError('avatar', {
        message: 'Please make some changes',
      })
      setError('email', {
        message: 'Please make some changes',
      })
      setError('first_name', {
        message: 'Please make some changes',
      })
      setError('last_name', {
        message: 'Please make some changes',
      })
    }

    try {
      let uploadedAvatar
      if (avatar && user?.avatar !== avatar) {
        const { data, error } = await supabase.storage
          .from('avatars')
          .upload(`${user?.id}.png`, decode(avatar), {
            contentType: 'image/png',
            upsert: true,
          })
        uploadedAvatar = data?.path
      }
      await supabase
        .from('users')
        .update({
          avatar: uploadedAvatar,
          first_name: formData.first_name,
          last_name: formData.last_name,
        })
        .eq('id', user?.id)

      if (!formattedData.email) return
      const { data, error } = await supabase.auth.updateUser({
        email: formattedData.email,
      })

      if (data?.user?.id)
        setError('email', {
          message: 'Please check your new email for a link to confirm',
        })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!user || !reset || !session) {
      router.push('/')
      return
    }
    const { avatar, first_name, last_name } = user
    reset({
      avatar: avatar || '',
      email: session?.user.email || '',
      first_name: first_name || '',
      last_name: last_name || '',
    })
  }, [user?.avatar, user?.first_name, user?.last_name, session?.user.email])

  return (
    <Fragment>
      <Header />
      <main className={styles.main}>
        <aside className={styles.main__aside}>
          <ProfilePreviewSidebar />
        </aside>
        <div className={styles.main__container}>
          <FormProvider {...formMethods}>
            {React.Children.map(children, (child) => {
              return React.cloneElement(child)
            })}
            <fieldset className={styles.main__container__fieldset}>
              <Button
                onClick={() => {
                  if (!clearErrors || !handleSubmit) return
                  if (pathname === '/profile/details') {
                    clearErrors()
                  }
                  handleSubmit(handleFormSubmit)()
                }}
                variant="primary"
              >
                Save
              </Button>
            </fieldset>
          </FormProvider>
        </div>
      </main>
    </Fragment>
  )
}

export default ProfileLayout
