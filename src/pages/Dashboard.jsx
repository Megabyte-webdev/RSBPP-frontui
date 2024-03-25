import { Col, Row } from "react-bootstrap"
import carousel from "../assets/dasboard-carousel.png"
import currencyIcon from "../assets/side-icons/currency.png"
import eLearning from "../assets/side-icons/elearning1.svg"
import talking from "../assets/side-icons/talking-chat.png"
import videoChat from "../assets/side-icons/video-chat.png"
import messagesIcon from "../assets/side-icons/messages-icon.png"
// import talking from "../assets/side-icons/video-chat.png"
import { Link } from "react-router-dom"
import DashCard from "../components/dashboard/DashCard"
import RoundChart from "../components/general/RoundChart"

const cardItems = [
    {
        number: 10,
        img: eLearning,
        text: "Ongoing Courses"
    },
    {
        number: 1,
        img: messagesIcon,
        text: "Support Messages"
    },
    {
        number: 10,
        img: videoChat,
        text: "Meetings"
    },
    {
        number: 10,
        img: talking,
        text: "Comments"
    },
]

const Dashboard = () => {
    return (
        <div>
            <h5 className="">Dashboard</h5>
            <div className="carousel_div my-4">
                <img src={carousel} alt="" className=" w-100" />
            </div>
            <div className="grid_card">
                <Row>
                    <Col md={3}>
                        <div className="shadow rounded p-3 py-4">
                            <div className="d-flex justify-content-center">
                                <img src={currencyIcon} alt="" className="" />
                            </div>
                            <div className="text-center border-bottom">
                                <p>Account Balance</p>
                                <p className="fs-4">$297.90</p>
                            </div>
                            <Link className="text-center pt-3 nav-link">Charge account</Link>
                        </div>
                    </Col>
                    <Col md={6}>
                        <Row>
                            {
                                cardItems.map((item, i) => (
                                    <Col key={i} md={6}>
                                        <DashCard
                                            item={item}
                                        />
                                    </Col>
                                ))
                            }
                        </Row>
                    </Col>
                    <Col md={3}>
                        <div className="shadow rounded p-3 py-4">
                            <RoundChart />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Dashboard