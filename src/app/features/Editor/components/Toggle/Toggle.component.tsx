import { Dispatch, SetStateAction } from "react"

export const Toggle = ({ checked, onChange, label }: { label: string, checked: boolean, onChange: Dispatch<SetStateAction<boolean>> }) => {
    return <>
            <h4>

                <label htmlFor={label.toLowerCase().replaceAll(" ", "_")}>{label}</label>
            </h4>
            <input
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                type="checkbox" className="hidden" id={label.toLowerCase().replaceAll(" ", "_")} />
            <div className="toggle" onClick={() => onChange(prev => !prev)}>
                <div className={"toggle__handle " + (checked ? "enabled" : "")}></div>
            </div>
           </>
}