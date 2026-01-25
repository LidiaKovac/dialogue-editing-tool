import {
  Dispatch,
  SetStateAction,
} from "react"
import "./toggle.scss"
export const Toggle = ({
  onChange,
  checked,
  label,
}: {
  label: string
  checked: boolean
  onChange: Dispatch<SetStateAction<boolean>>
}) => {
  const keyboardListener = (event: React.KeyboardEvent) => {
    if (event.key == " " || event.key == "Enter") {
      event.preventDefault()
      onChange(!checked)
    }
  }

  return (
    <>
      <label htmlFor={label.toLowerCase().replaceAll(" ", "_")} className="flex gap-3">
      <div className="text-sm">{label}</div>
        <input
          checked={checked}
          aria-hidden
          onChange={(e) => onChange(e.target.checked)}
          type="checkbox"
          className="hidden"
          id={label.toLowerCase().replaceAll(" ", "_")}
        />
        <div className="flex gap-4 items-center">
          <div
            tabIndex={0}
            className="toggle"
            role="checkbox"
            aria-checked={checked}
            aria-labelledby={label.toLowerCase().replaceAll(" ", "_")}
            onKeyDown={keyboardListener}
          >
            <div
              className={"toggle__handle " + (checked ? "enabled" : "")}
            ></div>
          </div>
          <div>{checked ? "ON" : "OFF"}</div>
        </div>
      </label>
    </>
  )
}
