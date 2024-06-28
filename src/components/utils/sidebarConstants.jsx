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
                title: "Live classes",
                link: "/courses",
            },
            {
                title: "Available courses",
                link: "/learning",
            },
            {
                title: "Today classes",
                link: "/today",
            },
            {
                title: "Time table",
                link: "/time_table",
            },
        ]
    },
    {
        title: "Forums",
        logo: iconThree,
        subOptions: [
            {
                title: "Chats",
                // link: "/chats",
                link: "/soon",
            },
            {
                title: "Messages",
                // link: "/messages",
                link: "/soon",
            }
        ]
    },
    {
        title: "Quizzes",
        logo: iconSix,
        subOptions: [
            {
                title: "Quiz",
                // link: "/quiz",
                link: "/soon",
            }
        ]
    },
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
                link: "/add_instructor",
            },
            {
                title: "Scheduled class",
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
        title: "Courses",
        logo: iconTwo,
        subOptions: [
            {
                title: "Add Course",
                link: "/faculty_add_course",
            },
            {
                title: "Create schedule",
                link: "/create_schedule",
            },
            {
                title: "My Courses",
                link: "/instructor_courses",
            }
        ]
    },
    {
        title: "Faculty",
        logo: iconTwo,
        subOptions: [
            {
                title: "Update Profile",
                link: "/profile_form",
            },
            // {
            //     title: "Create schedule",
            //     link: "/create_schedule",
            // },
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