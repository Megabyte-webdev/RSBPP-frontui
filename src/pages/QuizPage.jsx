import { Col, Row } from "react-bootstrap"
import { FaChevronRight } from "react-icons/fa6";
import { IoAddOutline } from "react-icons/io5";
import { RiMenu2Line } from "react-icons/ri";
import chatImg from "../assets/chats-sidebar.png"
import img2 from "../assets/img-2.png"
import country from "../assets/country.svg"
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import QuizSideCard from "../components/quiz/QuizSideCard";
import { FaRegCheckCircle } from "react-icons/fa";

const QuizPage = () => {
    const { setSideBg } = useContext(ThemeContext)

    const [maximize, setMaximize] = useState(true)

    useEffect(() => {
        setSideBg("brown_sidebar")
        console.count("render")
    }, [maximize])

    return (
        <div style={{ backgroundColor: "hsla(219, 50%, 95%, 1)" }}>
            <div className="py-5 px-4">
                <Row>
                    <Col md={4}>
                        <div className="brown_bg rounded text-white p-3">
                            <Link to={"/"} className="fs_xsm mb-3 nav-link">{" < Go to dashboard"}</Link>
                            <h4>Certified Cyber
                                Intelligence Investigator
                                (CCII)
                            </h4>
                            <div className="progress" style={{ height: ".4rem" }} role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                <div className="progress-bar blue_bg" style={{ width: "56%" }}></div>
                            </div>
                            <p className=" fs_sm my-3 me-2">56% Complete</p>
                        </div>
                        <div className="my-4">
                            <QuizSideCard />
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className="bg-white rounded">
                            <div className="px-4 py-2 border-2 border-bottom">
                                <h3>Prep Review Quiz: History and Background</h3>
                            </div>
                            <div className="p-4">
                                <div className="d-flex justify-content-center">
                                    <div className="col-md-6">
                                        <h6 className="text-success">Good Job!</h6>
                                        <p>Good Job ! You passed this quiz with a score of 100%</p>
                                        <h1 className="text-success fw-bolder">100%</h1>
                                        <p>You need 85 % to pass</p>
                                        <p className="fw-semibold">RETAKE</p>
                                        <button className="btn brown_bg text-light px-5 mt-4 rounded-pill">complete</button>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mt-4">
                                    <div className="col-md-10">
                                        <div className="my-3 light_danger p-3 d-flex">
                                            <p>
                                                How do you know your learners are retaining
                                                knowledge in appropriate volumes and timeframes?
                                                That’s right: You throw in assessments, and see if
                                                the students “catch your drift”. Obviously, there is
                                                a boring 
                                            </p>
                                            <span className="mt-3">
                                                <FaRegCheckCircle className="prime_brown " size={20} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mt-4">
                                    <div className="col-md-10">
                                        <div className="my-3 light_danger p-3 d-flex">
                                            <p>
                                                How do you know your learners are retaining
                                                knowledge in appropriate volumes and timeframes?
                                                That’s right: You throw in assessments, and see if
                                                the students “catch your drift”. Obviously, there is
                                                a boring 
                                            </p>
                                            <span className="mt-3">
                                                <FaRegCheckCircle className="prime_brown " size={20} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mt-4">
                                    <div className="col-md-10">
                                        <div className="my-3 light_danger p-3 d-flex">
                                            <p>
                                                How do you know your learners are retaining
                                                knowledge in appropriate volumes and timeframes?
                                                That’s right: You throw in assessments, and see if
                                                the students “catch your drift”. Obviously, there is
                                                a boring 
                                            </p>
                                            <span className="mt-3">
                                                <FaRegCheckCircle className="prime_brown " size={20} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default QuizPage