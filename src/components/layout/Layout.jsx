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
    const { setGetAllCarts,getAllCarts, setCartStore } = useContext(ResourceContext);

    const carts = JSON.parse(localStorage.getItem("carts") && localStorage.getItem("carts")) || null;

    const addToCart = async (details) => {
        try {
            const response = await axios.post(`${BASE_URL}cart/addCart`, details, {
                headers: { Authorization: `Bearer ${userCredentials.token}` },
            });
            toast.success(response.data.message);
            setGetAllCarts((prev) => ({ ...prev, isDataNeeded: true }));
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        if (userCredentials === null) {
            // Redirect to login and reset cart state for guests
            navigate("/login");
            setCartStore({ user: "guest", data: [] });
            carts && localStorage.removeItem("carts");
            console.log("User logged out");
            return;
        }

        // Transfer guest cart items to user cart if user logs in
        if (carts !== null && userCredentials !== null) {
            console.log(carts[0])
            navigate("/carts");
                carts[0]?.data.map((course)=>{
                    let detail={
                        user_id: userCredentials.user.id,
                        course_id: course.id,
                    }
                    addToCart(detail);
                })
              
                localStorage.removeItem("carts");                    
                

        }

        // Refresh user carts upon login
        try{
            setGetAllCarts((prev) => ({ ...prev, isDataNeeded: true }))
        }finally{
        setCartStore({data: getAllCarts.data})
        console.log(getAllCarts)
        }
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
