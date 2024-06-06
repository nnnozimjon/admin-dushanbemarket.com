import { createContext } from "react"

interface LayoutContextProps {
    refetchCount: () => void
}
export const LayoutContext = createContext<LayoutContextProps>({
    refetchCount: () => {}
})
