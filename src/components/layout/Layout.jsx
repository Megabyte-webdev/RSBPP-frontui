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
        }else{
        if (fromLocal?.user === "guest" && userCredentials !== null) {
navigate('/carts')
            fromLocal?.data.forEach((course) => {
                const addToCart = (details) => {
                    axios.post(`${BASE_URL}cart/addCart`, details, {
                        headers: {
                            'Authorization': `Bearer ${userCredentials.token}`,
                        },
                    })
                    .then(response => {
                        console.log(response);
                        toast.success(response.data.message);
                        setGetAllCarts((prev) => {
                            return {
                                ...prev, isDataNeeded: true
                            }
                        });
                        localStorage.removeItem('carts');

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                };

                let details = {
                    user_id: userCredentials?.user.id,
                    course_id: course.id
                }
                addToCart(details);
            });
        }else{
            setGetAllCarts((prev) => {
                return {
                    ...prev, isDataNeeded: true
                }
            });
navigate('/')
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