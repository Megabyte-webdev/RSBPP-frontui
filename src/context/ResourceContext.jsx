import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./AuthContext";
import { getItemFunc } from "../components/utils/getApi";

export const ResourceContext = createContext();

function ResourceContextProvider({ children }) {

    const { userCredentials } = useContext(UserContext);
    const token = userCredentials?.token ? userCredentials.token : null ;
    const userId = userCredentials?.user?.id;
    const [widgetOpen, setWidgetOpen] = useState({
        backgroundColor: "rgba(0, 0, 0, 0.15)",
        display: "block"
    })
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

    const [getAllCarts, setGetAllCarts] = useState({
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
    }, [getAllCourses.isDataNeeded]);

    //Carts Resource useEffect
    useEffect(() => {
        setErrorMessage('');
        if (getAllCarts.isDataNeeded) {
            const endPoint = `cart/getCart/${userId}`
            const dataArray = "Cart"
            getItemFunc(token, setGetAllCarts, setErrorMessage, endPoint, dataArray)
        }
    }, [getAllCarts.isDataNeeded]);



    return (
        <ResourceContext.Provider
            value={{
                errorMesage,
                getAllUsers,
                setGetAllUsers,
                getAllFaculty,
                setGetAllFaculty,
                getAllCourses,
                setGetAllCourses,
                getAllCarts,
                setGetAllCarts,
            }}
        >
            {children}
        </ResourceContext.Provider>
    )
}

export default ResourceContextProvider
