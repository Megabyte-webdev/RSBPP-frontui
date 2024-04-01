import { useContext } from "react"
import userPics from "../../assets/user-icon.png"
import SideBarOptions from './sidebarComponents/SideBarOptions'
import { ThemeContext } from "../../context/ThemeContext"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"

const MobileSidebar = () => {
    const { sideBg } = useContext(ThemeContext);

    return (
        <div className="d-md-none">
            <button className=" p-0 border rounded mt-5 ms-3 bg-white position-absolute top-0 start-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                <MdChevronRight size={30} />
            </button>

            <div className="offcanvas offcanvas-start brown_bg" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header d-flex justify-content-end">
                    <button type="button" className="border rounded brown_bg" data-bs-dismiss="offcanvas" aria-label="Close">
                        <MdChevronLeft size={30} />
                    </button>
                </div>
                <div className="offcanvas-body" style={{ scrollbarWidth: "none" }}>

                    <div className={sideBg}>
                        <div className=" py-4">
                            <div className="user_details mb-5">
                                <div className="d-flex justify-content-center mb-2">
                                    <img className="img-fluid" src={userPics} alt="" />
                                </div>
                                <p className="text-center fw-semibold">Cameron Schofield</p>
                                <div className="d-flex justify-content-between py-2">
                                    <div className="border-end col">
                                        <p className="text-center"><b>0</b></p>
                                        <p className="text-center">Courses</p>
                                    </div>
                                    <div className=" col">
                                        <p className="text-center"><b>0</b></p>
                                        <p className="text-center">Following</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <SideBarOptions />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileSidebar