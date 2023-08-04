
export type TVariant = 'primary' | 'secondary' | "nav"

export interface IButtonProps {
    variant: TVariant
    onClick: () => void
    children: string
    disabled?: boolean
}
