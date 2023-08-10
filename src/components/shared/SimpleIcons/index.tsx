import * as icon from '@icons-pack/react-simple-icons'

import { ISimpleIconsProps } from './SimpleIcons.types'

export const SimpleIcons = ({ name, ...props }: ISimpleIconsProps) => {
  const IconComponent = (icon as any)[name]

  return <IconComponent {...props} />
}
