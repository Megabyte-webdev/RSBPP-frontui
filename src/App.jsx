import Layout from './components/layout/Layout'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Registration from './pages/Registration'
import DashboardTwo from './pages/DashboardTwo'
import VideoConference from './pages/VideoConference'
import ThemeContextProvider from './context/ThemeContext'
import Courses from './pages/Courses'
import CoursesAnalysis from './pages/CoursesAnalysis'
import Chats from './pages/Chats'
import QuizPage from './pages/QuizPage'
import Messages from './pages/Messages'
import ToastProvider from './context/ToastProvider'
import UserContextProvider from './context/AuthContext'
import MyLearning from './pages/MyLearning'
import LearningDetails from './pages/LearningDetails'

const App = () => {
  return (
    <UserContextProvider>
      <ThemeContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<DashboardTwo />} />
              <Route path='/dashboard' element={<DashboardTwo />} />
              <Route path='/video_live' element={<VideoConference />} />
              <Route path='/courses' element={<Courses />} />
              <Route path='/learning' element={<MyLearning />} />
              <Route path='/learning/:id' element={<LearningDetails />} />
              <Route path='/courses_analysis' element={<CoursesAnalysis />} />
              <Route path='/chats' element={<Chats />} />
              <Route path='/quiz' element={<QuizPage />} />
              <Route path='/messages' element={<Messages />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </Router>
        <ToastProvider />
      </ThemeContextProvider>
    </UserContextProvider>
  )
}

export default App