import Layout from "./components/layout/Layout";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Registration from "./pages/Registration";
import DashboardTwo from "./pages/DashboardTwo";
import AdminDashboard from "./pages/AdminDashboard";
import VideoConference from "./pages/VideoConference";
import ThemeContextProvider from "./context/ThemeContext";
import Courses from "./pages/Courses";
import CoursesAnalysis from "./pages/CoursesAnalysis";
import Chats from "./pages/Chats";
import QuizPage from "./pages/QuizPage";
import Messages from "./pages/Messages";
import ToastProvider from "./context/ToastProvider";
import UserContextProvider, { UserContext } from "./context/AuthContext";
import MyLearning from "./pages/MyLearning";
import LearningDetails from "./pages/LearningDetails";
import { Suspense, lazy, useContext } from "react";
import UpComingClasses from "./pages/UpComingClasses";
import CreateSchedule from "./pages/CreateSchedule";
import TodayMeetings from "./pages/TodayMeetings";
import RegisteredStudent from "./pages/RegisteredStudent";
import ResourceContextProvider from "./context/ResourceContext";
import Carts from "./pages/Carts";
import CheckoutPage from "./pages/CheckoutPage";
import NotFound from "./pages/NotFound";
import MyCourses from "./pages/MyCourses";
import SuccessfulCheckoutPage from "./pages/SuccessfulCheckoutPage";
import NewLogin from "./pages/NewLogin";
import ClassSchedules from "./pages/ClassSchedules";
import CustomPagination from "./components/general/CustomPagination";
import CourseAdministration from "./pages/CourseAdministration";
import CourseMembers from "./pages/CourseMembers";
import FacultyAdministration from "./pages/FacultyAdministration";
import FacultyDashboard from "./pages/FacultyDashboard";
import MeetingHistory from "./pages/MeetingHistory";
import MeetingView from "./pages/MeetingView";
import MeetingParticipant from "./pages/MeetingParticipant";
import FacultyList from "./pages/FacultyList";
import UpdateProfile from "./pages/UpdateProfile";
import FacultyAddCourse from "./components/instructor/FacultyAddCourse";
import AddInstructor from "./components/stats/AddInstructor";
import InstructorCourses from "./pages/InstructorCourses";
import ComingSoon from "./pages/ComingSoon";
import FacultyEditCourse from "./components/instructor/FacultyEditCourse";
import MyClassSchedules from "./pages/MyClassSchedules";
import ProfileUpdate from "./pages/ProfileUpdate";
import VideoIndex from "./components/video-sdk-demo/src/VideoIndex";
import VideoCallClass from "./components/video-audio-demo/src/VideoCallClass";
import LoginOtpForm from "./components/auth/LoginOtpForm";
import OnlineProgramsLayout from "./components/onlineprograms/OnlineProgramsLayout";
import OnlinePrograms from "./components/onlineprograms/OnlinePrograms";
import Programme from "./components/onlineprograms/Programme";
import DigiKnowH from "./components/onlineprograms/DigiKnowH";
import ViewJournals from "./pages/ViewJournals";
import RemarkJournal from "./pages/RemarkJournal";
import AddJournal from "./pages/AddJournal";
import UploadAssignment from "./pages/UploadAssignment";
import SubmittedAssignments from "./pages/SubmittedAssignments";
import AllAssignment from "./pages/AllAssignment";
import GradeAssignment from "./pages/GradeAssignment";
import ViewGrade from "./pages/ViewGrade";

const App = () => {
  const { userCredentials } = useContext(UserContext);
  const role = userCredentials?.user.role.toLowerCase();

  return (
    <ResourceContextProvider>
      <ThemeContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  role === "admin" ? (
                    <AdminDashboard />
                  ) : role === "instructor" ? (
                    <FacultyDashboard />
                  ) : (
                    <DashboardTwo />
                  )
                }
              />
              <Route path="/dashboard" element={<DashboardTwo />} />
              <Route path="/video_live" element={<VideoConference />} />
              <Route path="/video_class" element={<VideoIndex />} />
              <Route path="/video_call" element={<VideoCallClass />} />
              <Route path="/courses" element={<MyCourses />} />
              <Route path="/today" element={<TodayMeetings />} />
              <Route path="/learning" element={<MyLearning />} />
              <Route path="/courses_analysis" element={<CoursesAnalysis />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/time_table" element={<ClassSchedules />} />
              <Route path="/my_liveclasses" element={<MyClassSchedules />} />
              <Route path="/test" element={<CustomPagination />} />
              <Route path="/soon" element={<ComingSoon />} />
              <Route path="/user_update" element={<ProfileUpdate />} />
              <Route path="/add-journal" element={<AddJournal />} />
              <Route path="/journal-remark" element={<RemarkJournal />} />
              <Route path="/view-journals" element={<ViewJournals />} />
              <Route path="/upload-assignment" element={<UploadAssignment />} />
              <Route
                path="/view-assignments/:course"
                element={<SubmittedAssignments />}
              />
              <Route path="/view-assignments" element={<AllAssignment />} />
              <Route
                path="/view-grade/:assignment"
                element={<ViewGrade />}
              />

              {role === "instructor" && (
                <>
                  <Route path="/schedule_classes" element={<UpComingClasses />} />
                  <Route path="/create_schedule" element={<CreateSchedule />} />
                  <Route path="/meetings_history" element={<MeetingHistory />} />
                  <Route path="/meetings_history/:id" element={<MeetingView />} />
                  <Route path="/participant_list" element={<MeetingParticipant />} />
                  <Route path="/faculty_list" element={<FacultyList />} />
                  <Route path="/profile_form" element={<UpdateProfile />} />
                  <Route path="/faculty_add_course" element={<FacultyAddCourse />} />
                  <Route path="/instructor_courses" element={<InstructorCourses />} />
                  <Route path="/instructor_courses/:id" element={<FacultyEditCourse />} />
                  <Route path="/remark-journal" element={<RemarkJournal />} />
                  <Route path="/grade-assignment" element={<GradeAssignment />} />
                </>
              )}

              {role === "admin" && (
                <>
                  <Route path="/schedule_classes" element={<UpComingClasses />} />
                  <Route path="/create_schedule" element={<CreateSchedule />} />
                  <Route path="/faculty_courses" element={<MyLearning />} />
                  <Route path="/faculty_courses/:id" element={<FacultyEditCourse />} />
                  <Route path="/registra" element={<RegisteredStudent />} />
                  <Route path="/courses_administration" element={<CourseAdministration />} />
                  <Route path="/courses_administration/:id" element={<CourseMembers />} />
                  <Route path="/faculty_administration" element={<FacultyAdministration />} />
                  <Route path="/add_instructor" element={<AddInstructor />} />
                </>
              )}
            </Route>

            {userCredentials && (
              <>
                <Route path="/learning/:id" element={<LearningDetails />} />
                <Route path="/carts" element={<Carts />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/success" element={<SuccessfulCheckoutPage />} />
              </>
            )}

            <Route path="/login" element={<NewLogin />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/verify_email" element={<Login />} />

            <Route path="/" element={<OnlineProgramsLayout />}>
              <Route path="/online-programmes" element={<OnlinePrograms />} />
              <Route path="/online-programmes/:program" element={<Programme />} />
              <Route path="/digiknowh" element={<DigiKnowH />} />
            </Route>

            <Route path="*" element={<Navigate to="/not-found" replace />} />
            <Route path="/not-found" element={<NotFound />} />
          </Routes>
        </Router>
        <ToastProvider />
      </ThemeContextProvider>
    </ResourceContextProvider>
  );
};

export default App;
