import { Outlet } from "react-router-dom"
import Nav from "./Nav"
import Footer from "./Footer"
import Banner from './Banner'
import Partners from './Partners'

const OnlineProgramsLayout = () => {
  return (
    <>
        <Nav />
        <Outlet />
       <Banner />
      <Partners />
        <Footer />
       
    </>
  )
}

export default OnlineProgramsLayout