import { createContext, useState } from "react";

export const UserContext = createContext()

const UserContextProvider = ({children}) =>{
    const fromLocal = JSON.parse(localStorage.getItem("userDetails"));


    const [userCredentials, setUserCredentials] = useState(fromLocal ? fromLocal : null)
    return(
<UserContext.Provider value={{ userCredentials, setUserCredentials }}
 >
    {children}
</UserContext.Provider>
    )
}

export default UserContextProvider;