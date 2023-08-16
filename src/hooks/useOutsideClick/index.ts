import { IuseOutsideClickProps } from './useOutsideClick.types'
import { useEffect } from 'react'

export const useOutsideClick = ({
  onOutsideClick,
  containerRef,
}: IuseOutsideClickProps) => {
  useEffect(() => {
    const onClick = ({ target }: any) =>
      !containerRef?.current?.contains(target) && onOutsideClick()
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
