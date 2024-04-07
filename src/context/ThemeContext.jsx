import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {

    const [sideBg, setSideBg] = useState("brown_sidebar")
    const [searchField, setSearchField] = useState(false)

    return (
        <ThemeContext.Provider value={{
            sideBg,
            setSideBg,
            searchField,
            setSearchField
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider