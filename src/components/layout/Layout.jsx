import { Col, Row } from "react-bootstrap"
import NavBar from "./NavBar"
import SideBar from "./SideBar"
import { Outlet, useNavigate } from "react-router-dom"
import MobileSidebar from "./MobileSidebar"
import { useContext, useEffect } from "react"
import { UserContext } from "../../context/AuthContext"
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL } from '../utils/base';
import { ResourceContext } from '../../context/ResourceContext';
const Layout = () => {
    const navigate = useNavigate()
    const {userCredentials} = useContext(UserContext);
    const fromLocal = (localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts"))[0] : null);
    const {
        setGetAllCarts } = useContext(ResourceContext);
    console.log(userCredentials)
    useEffect(() => {
        if (userCredentials === null) {
            navigate('/login')
            console.log(' logged out')
        }
    }, [userCredentials])
    return (
        <div>
            {userCredentials && (
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
            )}
        </div>
    )
}

export default Layout