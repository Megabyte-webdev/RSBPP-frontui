import iconOne from "../../assets/side-icons/new1.png"
import iconTwo from "../../assets/side-icons/new2.png"
import iconThree from "../../assets/side-icons/new3.png"
import iconFour from "../../assets/side-icons/new4.png"
import iconFive from "../../assets/side-icons/new5.png"
import iconSix from "../../assets/side-icons/new6.png"
import iconSeven from "../../assets/side-icons/new7.png"
import iconEight from "../../assets/side-icons/icon8.png"
import iconNine from "../../assets/side-icons/icon9.png"

export const sidebarConstants = [
    // {
    //     title: "Dashboard",
    //     logo: iconOne,
    //     subOptions: [
    //         {
    //             title: "One",
    //             link: "/",
    //         },
    //         {
    //             title: "Two",
    //             link: "",
    //         }
    //     ]
    // },
    {
        title: "Courses",
        logo: iconTwo,
        subOptions: [
            {
                title: "Live class",
                link: "/video_live",
            },
            {
                title: "My courses",
                link: "/courses",
            },
            {
                title: "courses analysis",
                link: "/courses_analysis",
            },
            {
                title: "my learning",
                link: "/learning",
            },
            {
                title: "today classes",
                link: "/today",
            },
            {
                title: "time table",
                link: "/time_table",
            },
        ]
    },
    {
        title: "Assignment",
        logo: iconFour,
        subOptions: null
    },
    // {
    //     title: "Facilitators",
    //     logo: iconFour,
    //     subOptions: null
    // },
    {
        title: "Forums",
        logo: iconThree,
        subOptions: [
            {
                title: "Chats",
                link: "/chats",
            },
            {
                title: "messages",
                link: "/messages",
            }
        ]
    },
    // {
    //     title: "Library/ Resource",
    //     logo: iconFive,
    //     subOptions: null
    // },
    {
        title: "Quizzes",
        logo: iconSix,
        subOptions: [
            {
                title: "Quiz",
                link: "/quiz",
            }
        ]
    },
    // {
    //     title: "Certificates",
    //     logo: iconSeven,
    //     subOptions: null
    // },
    // {
    //     title: "Event Schedule",
    //     link: "/time_table",
    // },
    // {
    //     title: "Logout",
    //     logo: iconNine,
    //     link : "/login",
    //     subOptions: null
    // },
]
export const adminConstants = [
    {
        title: "Course Admin",
        logo: iconTwo,
        subOptions: [
            {
                title: "Couses View",
                link: "/courses_administration",
            },
            {
                title: "Faculties View",
                link: "/faculty_administration",
            },
            {
                title: "All Schedules",
                link: "/time_table",
            },
            // {
            //     title: "Registra",
            //     link: "/registra",
            // },
        ]
    },
    {
        title: "Admin",
        logo: iconTwo,
        subOptions: [
            {
                title: "Faculty courses",
                link: "/faculty_courses",
            },
            {
                title: "Registra",
                link: "/registra",
            },
            {
                title: "Create schedule",
                link: "/create_schedule",
            },
            {
                title: "Add Instructor",
                link: "/profile_form",
            },
            {
                title: "Schedule class",
                link: "/time_table",
            },
        ]
    },
    // {
    //     title: "Logout",
    //     logo: iconNine,
    //     link : "/login",
    //     subOptions: null
    // },
]
export const facultyConstants = [
    {
        title: "Faculty",
        logo: iconTwo,
        subOptions: [
            {
                title: "Update Profile",
                link: "/profile_form",
            },
            {
                title: "Create schedule",
                link: "/create_schedule",
            },
            {
                title: "Meetings",
                link: "/meetings_history",
            },
            {
                title: "My Student List",
                link: "/participant_list",
            },
            {
                title: "Faculties",
                link: "/faculty_list",
            },
        ]
    },
    {
        title: "Meetings",
        logo: iconTwo,
        subOptions: [
            // {
            //     title: "Schedule class",
            //     link: "/schedule_classes",
            // },
            {
                title: "Create schedule",
                link: "/create_schedule",
            }
        ]
    },
]