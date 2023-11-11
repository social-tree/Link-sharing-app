'use client'

import React, { Fragment } from 'react'

import { DataProvider } from '@/Contexts'
import { Header } from '@/components'
import { ILayoutProps } from '@/types'

const PagesLayout = ({ children }: ILayoutProps) => {
  return (
    <Fragment>
      <DataProvider>{children}</DataProvider>
    </Fragment>
  )
}

export default PagesLayout
