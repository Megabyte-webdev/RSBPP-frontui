import Layout from './components/layout/Layout'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Registration from './pages/Registration'
import DashboardTwo from './pages/DashboardTwo'
import VideoConference from './pages/VideoConference'
import ThemeContextProvider from './context/ThemeContext'

const App = () => {
  return (
    <ThemeContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='/dashboard' element={<DashboardTwo />} />
            <Route path='/video_live' element={<VideoConference />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Router>
    </ThemeContextProvider> 
  )
}

export default App