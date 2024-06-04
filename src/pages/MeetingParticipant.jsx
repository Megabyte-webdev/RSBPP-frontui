import React from 'react'
import THead from '../components/general/THead'
import MeetingRow from '../components/faculty/MeetingRow'
import ParticipantRow from '../components/faculty/ParticipantRow'

const MeetingParticipant = () => {
    return (
        <div>
            <div
                className="p-3 p-md-5 min-vh-100"
                style={{ backgroundColor: "hsla(0, 0%, 85%, .1)" }}
            > 
                <p>Perticipant List</p>
                <div className="p-2 bg-white shadow-sm rounded my-3">
                    {/* <div className="overflow_y_md_50 overflow_y_80"> */}
                    <div className="mt-4 table-responsive-md">
                        <table className="table roboto table-hover">
                            <thead>
                                <tr>
                                    <THead name="Student Name" />
                                    <THead name="Course Subscribe" />
                                    <THead name="Email" />
                                    <THead name="Phone" />
                                    <THead name="Action" />
                                    <THead name="Participants" />
                                </tr>
                            </thead>
                            <tbody>
                                <ParticipantRow />
                                <ParticipantRow />
                                <ParticipantRow />
                                <ParticipantRow />
                                <ParticipantRow />
                                <ParticipantRow />
                                <ParticipantRow />
                                <ParticipantRow />
                                <ParticipantRow />
                            </tbody>
                        </table>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default MeetingParticipant