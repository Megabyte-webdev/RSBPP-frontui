import Layout from './components/layout/Layout'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Registration from './pages/Registration'
import DashboardTwo from './pages/DashboardTwo'
import AdminDashboard from './pages/AdminDashboard'
import VideoConference from './pages/VideoConference'
import ThemeContextProvider, { ThemeContext } from './context/ThemeContext'
import Courses from './pages/Courses'
import CoursesAnalysis from './pages/CoursesAnalysis'
import Chats from './pages/Chats'
import QuizPage from './pages/QuizPage'
import Messages from './pages/Messages'
import ToastProvider from './context/ToastProvider'
import UserContextProvider, { UserContext } from './context/AuthContext'
// import { UserContext } from './context/AuthContext'
import MyLearning from './pages/MyLearning'
import LearningDetails from './pages/LearningDetails'
import { useContext } from 'react'
import UpComingClasses from './pages/UpComingClasses'
import CreateSchedule from './pages/CreateSchedule'
import TodayMeetings from './pages/TodayMeetings'
import RegisteredStudent from './pages/RegisteredStudent'
import ResourceContextProvider from './context/ResourceContext'
import Carts from './pages/Carts'
import CheckoutPage from './pages/CheckoutPage'
import NotFound from './pages/NotFound'
import MyCourses from './pages/MyCourses'
import SuccessfulCheckoutPage from './pages/SuccessfulCheckoutPage'

const App = () => {
  const { userCredentials } = useContext(UserContext);
  const role = userCredentials?.user.role.toLowerCase();
  // console.log(userCredentials)
  return (
    // <UserContextProvider>
    <ResourceContextProvider>
      <ThemeContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={role === "admin" ? <DashboardTwo /> : <DashboardTwo />} />
              <Route path='/dashboard' element={<DashboardTwo />} />
              <Route path='/video_live' element={<VideoConference />} />
              <Route path='/courses' element={<MyCourses />} />
              <Route path='/today' element={<TodayMeetings />} />
              <Route path='/learning' element={<MyLearning />} />
              <Route path='/courses_analysis' element={<CoursesAnalysis />} />
              <Route path='/chats' element={<Chats />} />
              <Route path='/quiz' element={<QuizPage />} />
              <Route path='/messages' element={<Messages />} />
              {
                role === "admin" && (
                  <>
                    <Route path='/schedule_classes' element={<UpComingClasses />} />
                    <Route path='/create_schedule' element={<CreateSchedule />} />
                    <Route path='/faculty_courses' element={<MyLearning />} />
                    <Route path='/registra' element={<RegisteredStudent />} />
                  </>
                )
              }
            </Route>
            {userCredentials && (
              <>
                <Route path='/learning/:id' element={<LearningDetails />} />
                <Route path='/carts' element={<Carts />} />
                <Route path='/checkout' element={< CheckoutPage />} />
                <Route path='/success' element={< SuccessfulCheckoutPage />} />
              </>
            )}
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/registration" element={<Registration />} />
            {/* Catch-all route for 404 */}
            <Route path="*" element={<Navigate to="/not-found" replace />} />

            {/* 404 page component */}
            <Route path="/not-found" element={<NotFound />} />
          </Routes>
        </Router>
        <ToastProvider />
      </ThemeContextProvider>
    </ResourceContextProvider>
    // </UserContextProvider> 
  )
}

export default App