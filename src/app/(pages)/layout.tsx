import React, { Fragment } from 'react'

import { Header } from '@/components'
import { ILayoutProps } from '@/types'

const PagesLayout = ({ children }: ILayoutProps) => {
  return (
    <Fragment>
        <Header />
        {children}  
    </Fragment>
  )
}

export default PagesLayout