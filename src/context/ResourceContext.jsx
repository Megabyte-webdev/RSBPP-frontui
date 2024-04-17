import { createContext, useState } from "react";

export const ResourceContext = createContext();

function ResourceContextProvider({children}){
    const [getAllUsers, setGetAllUsers] = useState({
        data: null,
        isDashboardDataNeeded: false,
      });
    return(
        <ResourceContext.Provider
        value={{getAllUsers,
            setGetAllUsers  }}
        >

        </ResourceContext.Provider>
    )
}
