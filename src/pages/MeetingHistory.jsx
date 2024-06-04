import React from 'react'
import THead from '../components/general/THead'
import MeetingRow from '../components/faculty/MeetingRow'

const MeetingHistory = () => {
    return (
        <div>
            <div
                className="p-3 p-md-5 min-vh-100"
                style={{ backgroundColor: "hsla(0, 0%, 85%, .1)" }}
            > 
                <p>List of all Meeting History</p>
                <div className="p-2 bg-white shadow-sm rounded my-3">
                    {/* <div className="overflow_y_md_50 overflow_y_80"> */}
                    <div className="mt-4 table-responsive-md">
                        <table className="table roboto table-hover">
                            <thead>
                                <tr>
                                    <THead name="Host" />
                                    <THead name="Type" />
                                    <THead name="Meeting Code" />
                                    <THead name="Started at" />
                                    <THead name="Ended at" />
                                    <THead name="Participants" />
                                </tr>
                            </thead>
                            <tbody>
                                <MeetingRow />
                                <MeetingRow />
                                <MeetingRow />
                                <MeetingRow />
                                <MeetingRow />
                                <MeetingRow />
                                <MeetingRow />
                                <MeetingRow />
                            </tbody>
                        </table>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default MeetingHistory