import { Dispatch, SetStateAction } from "react"

export const Toggle = ({
  checked,
  onChange,
  label,
}: {
  label: string
  checked: boolean
  onChange: Dispatch<SetStateAction<boolean>>
}) => {
    const keyboardListener = (event: React.KeyboardEvent) => {
      if (event.key == " " || event.key == "Enter") {
        event.preventDefault()
        onChange((prev) => !prev)
      }
    }
    return (
      <>
        <h4>
          <label htmlFor={label.toLowerCase().replaceAll(" ", "_")}>
            {label}
          </label>
        </h4>
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
            onClick={() => onChange((prev) => !prev)}
            onKeyDown={keyboardListener}
          >
            <div
              className={"toggle__handle " + (checked ? "enabled" : "")}
            ></div>
          </div>
          <div>{checked ? "ON" : "OFF"}</div>
        </div>
      </>
    )
}
