import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {

    const [sideBg, setSideBg] = useState("brown_sidebar")

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