import { Col, Row } from "react-bootstrap"
import NavBar from "./NavBar"
import SideBar from "./SideBar"
import { Outlet } from "react-router-dom"
import MobileSidebar from "./MobileSidebar"

const Layout = () => {
    return (
        <div>
            <Row className="g-0  poppins">
                <SideBar />
                <Col md={10}>
                <MobileSidebar />
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