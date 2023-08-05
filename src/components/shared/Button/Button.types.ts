export type TVariant = 'primary' | 'secondary'

export interface IButtonProps {
  variant: TVariant
  onClick: () => void
  children: string
  disabled?: boolean
}
