import React from 'react'
import THead from '../components/general/THead'
import FacultyRow from '../components/faculty/FacultyRow'

const FacultyList = () => {
    return (
        <div>
            <div
                className="p-3 p-md-5 min-vh-100"
                style={{ backgroundColor: "hsla(0, 0%, 85%, .1)" }}
            > 
                <p>Faculties List</p>
                <div className="p-2 bg-white shadow-sm rounded my-3">
                    {/* <div className="overflow_y_md_50 overflow_y_80"> */}
                    <div className="mt-4 table-responsive-md">
                        <table className="table roboto table-hover">
                            <thead>
                                <tr>
                                    <THead name="Faculty Name" />
                                    <THead name="Type" />
                                    <THead name="Course" />
                                    <THead name="NO. of Enrolled Student" />
                                    <THead name="Start date" />
                                    <THead name="Actions" />
                                </tr>
                            </thead>
                            <tbody>
                                <FacultyRow />
                                <FacultyRow />
                                <FacultyRow />
                                <FacultyRow />
                                <FacultyRow />
                                <FacultyRow />
                                <FacultyRow />
                                <FacultyRow />
                            </tbody>
                        </table>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default FacultyList