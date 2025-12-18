import { useState } from "react"
import "./tooltip.scss"
export const ToolTip = ({ data }: { data: string }) => {
  const [show, setShow] = useState(false)
  return (
    <span
      data-tooltip={data}
      tabIndex={0}
      role="tooltip"
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {show && <span> {data} </span>}
    </span>
  )
}
