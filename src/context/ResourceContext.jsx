import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./AuthContext";
import { getItemByPost, getItemFunc, getTimeTable } from "../components/utils/getApi";
import { TOKEN } from "../components/utils/base";

export const ResourceContext = createContext();

function ResourceContextProvider({ children }) {
    const [fromLocal, setFromLocal] = useState();
    const { userCredentials } = useContext(UserContext);
    const token = userCredentials?.token ? userCredentials.token : null;
    const userId = userCredentials?.user?.id;
    const [widgetOpen, setWidgetOpen] = useState({
        backgroundColor: "rgba(0, 0, 0, 0.15)",
        display: "block"
    })
    const [errorMesage, setErrorMessage] = useState('');

    const [meetingTitle, setMeetingTitle] = useState('');

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


    const [getEnrolledCourses, setGetEnrolledCourses] = useState({
        data: null,
        isDataNeeded: false,
    });

    const [getAllSchedules, setGetAllSchedules] = useState({
        data: null,
        isDataNeeded: false,
    });

    const [getAllInstructors, setGetAllInstructors] = useState({
        data: null,
        isDataNeeded: false,
    });

    const [getAllInstructorsSchedules, setGetAllInstructorsSchedules] = useState({
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
            getItemFunc(token || TOKEN, setGetAllCourses, setErrorMessage, endPoint, dataArray)
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

    //Enroll Courses Resource useEffect
    useEffect(() => {
        setErrorMessage('');
        if (getEnrolledCourses.isDataNeeded) {
            const endPoint = `enroll/getEnrollByUserId/${userId}`
            const dataArray = "enrolled_users"
            getItemFunc(token, setGetEnrolledCourses, setErrorMessage, endPoint, dataArray)
        }
    }, [getEnrolledCourses.isDataNeeded]);

    //Class Schedule Resource useEffect
    useEffect(() => {
        setErrorMessage('');
        if (getAllSchedules.isDataNeeded) {
            const endPoint = "schedule/allSchedule"
            const dataArray = "schedule"
            getTimeTable(token, setGetAllSchedules, setErrorMessage, endPoint, dataArray)
        }
    }, [getAllSchedules.isDataNeeded]);

    //All Instructors Resource useEffect
    useEffect(() => {
        setErrorMessage('');
        if (getAllInstructors.isDataNeeded) {
            const endPoint = "instructor/get"
            const dataArray = "instructors"
            getItemFunc(token, setGetAllInstructors, setErrorMessage, endPoint, dataArray)
        }
    }, [getAllInstructors.isDataNeeded]);

    //All Instructors Schedules Resource useEffect
    useEffect(() => {
        setErrorMessage('');
        if (getAllInstructorsSchedules.isDataNeeded) {
            const endPoint = `schedule/scheduleByInstructorId/${userId}`
            const dataArray = "schedule"
            getItemFunc(token, setGetAllInstructorsSchedules, setErrorMessage, endPoint, dataArray)
        }
    }, [getAllInstructorsSchedules.isDataNeeded]);



    return (
        <ResourceContext.Provider
            value={{
                errorMesage,
                getAllUsers,
                meetingTitle,
                setMeetingTitle,
                setGetAllUsers,
                getAllFaculty,
                setGetAllFaculty,
                getAllCourses,
                setGetAllCourses,
                getAllCarts,
                setGetAllCarts,
                getEnrolledCourses,
                setGetEnrolledCourses,
                getAllSchedules,
                setGetAllSchedules,
                getAllInstructors,
                setGetAllInstructors,
                getAllInstructorsSchedules,
                setGetAllInstructorsSchedules,
                fromLocal,
                setFromLocal
            }}
        >
            {children}
        </ResourceContext.Provider>
    )
}

export default ResourceContextProvider
