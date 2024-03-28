import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {

    const [sideBg, setSideBg] = useState("")

    return (
        <ThemeContext.Provider value={{
            sideBg, 
            setSideBg
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider