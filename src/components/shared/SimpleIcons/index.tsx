import * as icons from '@icons-pack/react-simple-icons'

import { ISimpleIconsProps } from './SimpleIcons.types'

export const SimpleIcons = ({ name, ...props }: ISimpleIconsProps) => {
  const IconComponent = (icons as any)[name]

  return <IconComponent {...props} />
}
