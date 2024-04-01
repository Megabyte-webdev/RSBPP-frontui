import { Col } from "react-bootstrap"
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

const Chats = () => {
    const { setSideBg } = useContext(ThemeContext)

    const [maximize, setMaximize] = useState(true)

    useEffect(() => {
        setSideBg("brown_sidebar")
        console.count("render")
    }, [maximize])

    return (
        <div style={{ backgroundColor: "hsla(219, 50%, 95%, 1)" }}>
            <div className="d-flex ">
                <div className=" bg-white border-end">
                    <div className="p-3">
                        {
                            maximize ? (
                                <div>
                                    <div className=" d-flex align-items-center justify-content-between">
                                        <span>chats</span>
                                        <span className="pointer" onClick={() => setMaximize(false)} > <FaChevronLeft className="prime_brown" /> </span>
                                    </div>
                                    <div className="my-3">
                                        <button className="btn blue_bg rounded-pill text-white fs_sm fw-light text-nowrap">+ New Conversation</button>
                                    </div>
                                </div>
                            )
                                :
                                (
                                    <div>
                                        <div className="btn p-0 bg-white border-0">
                                            {/* <RiMenu2Line className="prime_brown" size={30} /> */}
                                            <span className="pointer" onClick={() => setMaximize(true)} > <RiMenu2Line className="prime_brown" size={30} /> </span>
                                        </div>
                                        <div className="my-3">
                                            <button
                                                style={{ height: "35px", width: "35px" }} className="btn brown_bg rounded-circle text-white d-flex align-items-center p-1">
                                                <IoAddOutline size={35} /></button>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                    <div className="my-2 p-1 pe-3">
                        <Link className="border-start focus_brown border-3 border-white nav-link d-flex ps-2">
                            <div className="border-3 ps-2">
                                <img src={chatImg} alt="" width={40} height={50} className="img-fluid" />
                            </div>
                            {
                                maximize && (
                                    <div className="ms-2">
                                        <p>Henry G.</p>
                                        <span className="fs_xsm">3 Minutes ago</span>
                                    </div>
                                )
                            }
                        </Link>
                    </div>
                    <div className="my-2 p-1 pe-3">
                        <Link className="border-start focus_brown border-3 border-white nav-link d-flex ps-2">
                            <div className="border-3 ps-2">
                                <img src={chatImg} alt="" width={40} height={50} className="img-fluid" />
                            </div>
                            {
                                maximize && (
                                    <div className="ms-2">
                                        <p>Henry G.</p>
                                        <span className="fs_xsm">3 Minutes ago</span>
                                    </div>
                                )
                            }
                        </Link>
                    </div>
                    <div className="my-2 p-1 pe-3">
                        <Link className="border-start focus_brown border-3 border-white nav-link d-flex ps-2">
                            <div className="border-3 ps-2">
                                <img src={chatImg} alt="" width={40} height={50} className="img-fluid" />
                            </div>
                            {
                                maximize && (
                                    <div className="ms-2">
                                        <p>Henry G.</p>
                                        <span className="fs_xsm">3 Minutes ago</span>
                                    </div>
                                )
                            }
                        </Link>
                    </div>
                    <div className="my-2 p-1 pe-3">
                        <Link className="border-start focus_brown border-3 border-white nav-link d-flex ps-2">
                            <div className="border-3 ps-2">
                                <img src={chatImg} alt="" width={40} height={50} className="img-fluid" />
                            </div>
                            {
                                maximize && (
                                    <div className="ms-2">
                                        <p>Henry G.</p>
                                        <span className="fs_xsm">3 Minutes ago</span>
                                    </div>
                                )
                            }
                        </Link>
                    </div>
                    <div className="my-2 p-1 pe-3">
                        <Link className="border-start focus_brown border-3 border-white nav-link d-flex ps-2">
                            <div className="border-3 ps-2">
                                <img src={chatImg} alt="" width={40} height={50} className="img-fluid" />
                            </div>
                            {
                                maximize && (
                                    <div className="ms-2">
                                        <p>Henry G.</p>
                                        <span className="fs_xsm">3 Minutes ago</span>
                                    </div>
                                )
                            }
                        </Link>
                    </div>
                    <div className="my-2 p-1 pe-3">
                        <Link className="border-start focus_brown border-3 border-white nav-link d-flex ps-2">
                            <div className="border-3 ps-2">
                                <img src={chatImg} alt="" width={40} height={50} className="img-fluid" />
                            </div>
                            {
                                maximize && (
                                    <div className="ms-2">
                                        <p>Henry G.</p>
                                        <span className="fs_xsm">3 Minutes ago</span>
                                    </div>
                                )
                            }
                        </Link>
                    </div>
                    <div className="my-2 p-1 pe-3">
                        <Link className="border-start focus_brown border-3 border-white nav-link d-flex ps-2">
                            <div className="border-3 ps-2">
                                <img src={chatImg} alt="" width={40} height={50} className="img-fluid" />
                            </div>
                            {
                                maximize && (
                                    <div className="ms-2">
                                        <p>Henry G.</p>
                                        <span className="fs_xsm">3 Minutes ago</span>
                                    </div>
                                )
                            }
                        </Link>
                    </div>
                </div>
                <Col className="w-100">
                    <div className="h-100 v_100 fs_xsm position-relative p-md-5">
                        <div className="conversation p-1">
                            <div className="d-flex my-3">
                                <div className="me-3">
                                    <img src={chatImg} alt="" height="60" width="60" className=" chat_pic" />
                                </div>
                                <div className="p-3 bg-white col-md-10 rounded">
                                    I was wondering why Danny still works on Sketch
                                    when Figma is now cheap and accessible.
                                    This could really boost our process.
                                </div>
                            </div>
                            <div className="d-flex justify-content-end my-3">
                                <div className="p-3 col-md-10 rounded rounded-bottom  rounded-4 rounded-end-0 dark_ash">
                                    I was wondering why Danny still works on Sketch
                                    when Figma is now cheap and accessible.
                                    This could really boost our process.
                                </div>
                                <div className="ms-3">
                                    <img src={img2} alt="" height="60" width="60" className=" chat_pic" />
                                </div>
                            </div>
                        </div>
                        <div className="position-absolute w-100 start-0 bottom-0">
                            <form className='open_sans mb-2' style={{ color: "hsla(242, 97%, 15%, .6)" }}>
                                <div className="px-3">
                                    <div className='position-relative'>
                                        <input type="text" className="btn border rounded-pill bg-white text-start px-5 px_4rem py-2 w-100" id="comment" placeholder='Search' />
                                        <div className="position-absolute top-50 translate-middle-y p-2">
                                            <span className=" p-1">
                                                <IoAddOutline size={20} />
                                            </span>
                                            <span className=" p-1">
                                                <MdOutlineEmojiEmotions size={20} />
                                            </span>
                                        </div>
                                        <div className="position-absolute h-100 top-0 end-0">
                                            <button className="btn brown_bg text-white h-100 fs_sm rounded-pill px-4">send</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Col>
                <Col xs={2} className="bg-white d-none d-md-block px-3 py-5">
                    <div className="d-flex justify-content-center">
                        <div className="">
                            <div className="position-relative">
                                <div>
                                    <img src={img2} alt="" className="img-fluid" />
                                </div>
                                <div className="position-absolute bottom-0 end-0">
                                    <img src={country} alt="" className="img-fluid" />
                                </div>
                            </div>
                            <div className="text-center my-3">
                                <p>Melany W.</p>
                                <p className="fs_xsm">30 minutes ago</p>
                            </div>
                        </div>
                    </div>
                </Col>
            </div>
        </div>
    )
}

export default Chats