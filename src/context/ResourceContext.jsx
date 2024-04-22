import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./AuthContext";
import { getItemFunc } from "../components/utils/getApi";

export const ResourceContext = createContext();

function ResourceContextProvider({ children }) {

    const { userCredentials } = useContext(UserContext);
    // console.log(userCredentials.token)
    const token = userCredentials?.token ? userCredentials.token : "nothing"

    const [errorMesage, setErrorMessage] = useState('');

    const [getAllUsers, setGetAllUsers] = useState({
        data: null,
        isDataNeeded: false,
    });

    const [getAllFaculty, setGetAllFaculty] = useState({
        data: null,
        isDataNeeded: false,
    });

    const [getAllCourses, setGetAllCourses] = useState({
        data: null,
        isDataNeeded: false,
    });


    //Users Resource useEffect
    useEffect(() => {
        setErrorMessage('');
        if (getAllUsers.isDataNeeded) {
            const endPoint = "user/getUsers"
            const dataArray = "allUsers"
            getItemFunc(token, setGetAllUsers, setErrorMessage, endPoint, dataArray)
        }
    }, [getAllUsers.isDataNeeded]);

    //Faculty Resource useEffect
    useEffect(() => {
        setErrorMessage('');
        if (getAllFaculty.isDataNeeded) {
            const endPoint = "faculty/getAllFaculty"
            const dataArray = "allFaculty"
            getItemFunc(token, setGetAllFaculty, setErrorMessage, endPoint, dataArray)
        }
    }, [getAllFaculty.isDataNeeded]);

    //Courses Resource useEffect
    useEffect(() => {
        setErrorMessage('');
        if (getAllCourses.isDataNeeded) {
            const endPoint = "course/getAllCourses"
            const dataArray = "allCourses"
            getItemFunc(token, setGetAllCourses, setErrorMessage, endPoint, dataArray)
        }
    }, [getAllFaculty.isDataNeeded]);


    return (
        <ResourceContext.Provider
            value={{
                getAllUsers,
                setGetAllUsers,
                getAllFaculty,
                setGetAllFaculty,
                getAllCourses,
                setGetAllCourses,
            }}
        >
            {children}
        </ResourceContext.Provider>
    )
}

export default ResourceContextProvider
