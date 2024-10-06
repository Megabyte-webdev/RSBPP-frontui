import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Banner from './Banner'
import Partners from './Partners'

const OnlineProgramsLayout = () => {
  return (
    <>
        <Navbar />
        <Outlet />
        <Footer />
       <Banner />
      <Partners />
    </>
  )
}

export default OnlineProgramsLayout