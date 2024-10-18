// import iconOne from "../../assets/side-icons/new1.png"
import iconTwo from "../../assets/side-icons/new2.png"
import iconThree from "../../assets/side-icons/new3.png"
// import iconFour from "../../assets/side-icons/new4.png"
// import iconFive from "../../assets/side-icons/new5.png"
// import iconSix from "../../assets/side-icons/new6.png"
import iconSeven from "../../assets/side-icons/new7.png"
import iconEight from "../../assets/side-icons/user-update.svg"
// import iconNine from "../../assets/side-icons/icon9.png"

export const sidebarConstants = [
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
        title: "Jounals",
        logo: iconTwo,
        subOptions: [
            {
                title: "Add Journal",
                link: "/add-journal",
            },
            {
                title: "View Journals",
                link: "/view-journals",
            }
        ]
    },
    {
        title: "Assignment",
        logo: iconTwo,
        subOptions: [
            {
                title: "Upload Assignment",
                link: "/upload-assignment",
            },
            {
                title: "Submitted Assignments",
                link: "/submitted-assignments",
            }
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
        title: "Profile",
        logo: iconEight,
        subOptions: [
            {
                title: "Profile Update",
                // link: "/quiz",
                link: "/user_update",
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
        ]
    },{
        title: "Journals",
        logo: iconTwo,
        subOptions: [
            {
                title: "All Journals",
                link: "/view-journals",
            }
        ]
    },{
        title: "Assignment",
        logo: iconTwo,
        subOptions: [
            {
                title: "Add Assignment",
                link: "/upload-assignment",
            },{
                title: "View All Assignments",
                link: "/view-assignments",
            },
            {
                title: "Submitted Assignments",
                link: "/submitted-assignments",
            }
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
            // {
            //     title: "Create schedule",
            //     link: "/create_schedule",
            // },
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
    {
        title: "Profile",
        logo: iconEight,
        subOptions: [
            {
                title: "Profile Update",
                // link: "/quiz",
                link: "/user_update",
            }
        ]
    },
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
                title: "All Meetings",
                link: "/meetings_history",
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
                title: "My Student List",
                link: "/participant_list",
            },
            {
                title: "Faculties",
                link: "/faculty_list",
            },
        ]
    },
]