import { Col, Row } from "react-bootstrap"
import NavBar from "./NavBar"
import SideBar from "./SideBar"
import { Outlet } from "react-router-dom"
import MobileSidebar from "./MobileSidebar"
import { useContext } from "react"
import { UserContext } from "../../context/AuthContext"

const Layout = () => {
    const {userCredentials} = useContext(UserContext);

    console.log(userCredentials)
    return (
        <div>
            <Row className="g-0  poppins">
                <SideBar userCredentials={userCredentials} />
                <Col md={10}>
                <MobileSidebar userCredentials={userCredentials} />
                    <NavBar />
                    <main className="">
                        <Outlet />
                    </main>
                </Col>
            </Row>
        </div>
    )
}

export default Layout