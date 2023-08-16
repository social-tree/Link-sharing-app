export type TPlatformType = {
  icon_name: string
  name: string
  regex: string
  background_color: string
}

export type TPlatformTypeWithLink = TPlatformType & { link: string }
