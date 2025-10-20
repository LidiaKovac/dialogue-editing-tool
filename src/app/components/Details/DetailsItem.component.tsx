import { ReactNode } from "react"

export const DetailItem = ({children, title}: {title: string, children: ReactNode}) => {
    return <li>
        <h5>{title}</h5>
        {children}
    </li>
}