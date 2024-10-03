import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const OnlineProgramsLayout = () => {
  return (
    <>
        <Navbar />
        <Outlet />
    </>
  )
}

export default OnlineProgramsLayout