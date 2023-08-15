import { Ref, RefObject } from 'react'

export interface IuseOutsideClickProps {
  onOutsideClick: () => void
  containerRef: RefObject<any>
}
