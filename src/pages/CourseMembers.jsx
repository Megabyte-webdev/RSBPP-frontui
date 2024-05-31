import React from 'react'
import THead from '../components/general/THead'
import { useLocation, useNavigate } from 'react-router-dom'

const CourseMembers = () => {
    const { state } = useLocation()
const navigate = useNavigate()
    console.log(state)
    return (
        <div
            className="p-3 p-md-5 min-vh-100"
            style={{ backgroundColor: "hsla(0, 0%, 85%, .3)" }}
        >
            <div>
                <div className="text-center border-bottom">
                    <h2> List of Course Members</h2>
                </div>
                <div className="overflow_y_md_50 overflow_y_80 col-md-11">
                    <div className="mt-4 table-responsive-md">
                        <table className="table  table-hover">
                            <thead>
                                <tr>
                                    <THead name="No:" />
                                    <THead name="First Name" />
                                    <THead name="Surname" />
                                    <THead name="Email" />
                                </tr>
                            </thead>
                            <tbody>
                                {state.data?.map((list, index) => {
                                    return (
                                        <tr className='shadow mb-1' key={list.enrollId}>
                                            <th scope="row">{index + 1} </th>
                                            <td>{list.first_name}</td>
                                            <td>{list.last_name}</td>
                                            <td>{list.email}</td>
                                        </tr>
                                    )
                                })}
                                {/* <tr>
                                    <th scope="row">1</th>
                                    <td>Jane Cooper</td>
                                    <td>Microsoft</td>
                                    <td>Microsoft</td>
                                    <td>(225) 555-0118</td>
                                    <td>jane@microsoft.com</td>
                                    <td>United States</td>
                                    <td>
                                        <button className='btn' style={{ border: "1px solid hsla(0, 97%, 44%, 1))", backgroundColor: "hsla(166, 79%, 42%, 0.38)", color: "hsla(166, 79%, 42%, 1)" }}>Active</button>
                                    </td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="">
                    <button onClick={()=> navigate('/courses_administration')} className='btn text-white brown_bg' style={{ border: "1px solid hsla(166, 79%, 42%, 1)"}}>Return Back</button>
                </div>
            </div>
        </div>
    )
}

export default CourseMembers