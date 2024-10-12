import { Col, Row } from "react-bootstrap"
import NavBar from "./NavBar"
import SideBar from "./SideBar"
import { Outlet, useNavigate } from "react-router-dom"
import MobileSidebar from "./MobileSidebar"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/AuthContext"
import Nav from "../onlineprograms/Nav"

const Layout = () => {
    const navigate = useNavigate()
    const {userCredentials} = useContext(UserContext);
    const fromLocal = (localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts"))[0] : null);
    const [comingFrom, setComingFrom]= useState(localStorage.getItem("comingFrom") ? localStorage.getItem("comingFrom") : false)
    console.log(userCredentials)
    useEffect(() => {
        if (userCredentials === null) {
            navigate('/login')
            console.log(' logged out')
        }else{
            if(fromLocal && userCredentials){
                navigate('/carts')
            }
        }
    }, [userCredentials])
    return (
        <div>
            {userCredentials && (
                <Row className="g-0  poppins">
                <SideBar userCredentials={userCredentials} />
                <Col md={10}>
                <MobileSidebar userCredentials={userCredentials} />
                    {
                        (comingFrom && userCredentials) ? <Nav /> : <NavBar />}
                    <main className="">
                        <Outlet />
                    </main>
                </Col>
            </Row>
            )}
        </div>
    )
}

export default Layout