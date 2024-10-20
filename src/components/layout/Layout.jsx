import { Col, Row } from "react-bootstrap";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import MobileSidebar from "./MobileSidebar";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/base";
import { ResourceContext } from "../../context/ResourceContext";

const Layout = () => {
    const navigate = useNavigate();
    const { userCredentials } = useContext(UserContext);
    const carts = JSON.parse(localStorage.getItem("carts") || "null");

    const { setGetAllCarts, setCartStore } = useContext(ResourceContext);

    const addToCart = async (details) => {
        try {
            const response = await axios.post(`${BASE_URL}cart/addCart`, details, {
                headers: {
                    Authorization: `Bearer ${userCredentials.token}`,
                },
            });
            toast.success(response.data.message);
            setGetAllCarts((prev) => ({ ...prev, isDataNeeded: true }));
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        // If user is not logged in, redirect to login
        if (userCredentials === null) {
            navigate("/login");
            console.log("User logged out");
            setCartStore({ user: "guest", data: [] })
            return;
        }

        // If guest cart exists and user logs in, transfer guest cart items
        if (carts && userCredentials) {
            navigate("/carts");
            // Transfer each course from guest cart to user's cart
           
                carts?.data.map((course) => 
                    addToCart({
                        user_id: userCredentials.user.id,
                        course_id: course.id,
                    })
                )
            
                localStorage.removeItem("carts");
               
          
        }

        // Refresh user carts when user logs in
        setGetAllCarts((prev) => ({ ...prev, isDataNeeded: true }));
    }, [userCredentials]);

    return (
        <div>
            {userCredentials && (
                <Row className="g-0 poppins">
                    <SideBar userCredentials={userCredentials} />
                    <Col md={10}>
                        <MobileSidebar userCredentials={userCredentials} />
                        <NavBar />
                        <main>
                            <Outlet />
                        </main>
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default Layout;
