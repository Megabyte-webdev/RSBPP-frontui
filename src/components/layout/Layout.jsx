import { Col, Row } from "react-bootstrap"
import NavBar from "./NavBar"
import SideBar from "./SideBar"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div>
            <NavBar />
            <Row className="g-0  poppins">
                <SideBar />
                <Col md={10}>
                    <main style={{ backgroundColor: "hsla(0, 0%, 85%, .1)" }} className="p-4">
                    <Outlet />
                    </main>
                </Col>
            </Row>
        </div>
    )
}

export default Layout