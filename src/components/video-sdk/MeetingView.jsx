import { Constants, useMeeting } from "@videosdk.live/react-sdk";
import Controls from "./Controls";
import ParticipantView from "./ParticipantView";
import PresenterView from "./PresenterView";
import { useContext, useState } from "react";
import { UserContext } from "../../context/AuthContext";
import { MdArrowLeft } from "react-icons/md";
import { BsRecordCircle, BsStopCircle } from "react-icons/bs";
import Loading from "../loader/Loading";
import { useNavigate } from "react-router-dom";
import { FcEndCall } from "react-icons/fc";


function MeetingView(props) {
    const navigate = useNavigate()

    const day = new Date(props.state.list.day).toDateString()

    const { userCredentials } = useContext(UserContext)
    const [activeRecord, setActiveRecord] = useState(false)
    const [joined, setJoined] = useState(null);
    const [checkSpeaker, setCheckSpeaker] = useState(null);
    const role = userCredentials.user?.role
    const firstName = userCredentials.user?.first_name

    //Callback for when the presenter changes
    function onPresenterChanged(presenterId) {
        if (presenterId) {
            console.log(presenterId, "started screen share");
        } else {
            console.log("someone stopped screen share");
        }
    }

    // Callback when speaker changes
    function onSpeakerChanged(activeSpeakerId) {
        // console.log(" onSpeakerChanged", activeSpeakerId);
        setCheckSpeaker(activeSpeakerId);
    }
    function onRecordingStateChanged(data) {
        const { status } = data;

        if (status === Constants.recordingEvents.RECORDING_STARTING) {
            console.log("Meeting recording is starting");
        } else if (status === Constants.recordingEvents.RECORDING_STARTED) {
            console.log("Meeting recording is started");
        } else if (status === Constants.recordingEvents.RECORDING_STOPPING) {
            console.log("Meeting recording is stopping");
        } else if (status === Constants.recordingEvents.RECORDING_STOPPED) {
            console.log("Meeting recording is stopped");
        } else {
            //
        }
    }

    const { join, end,
        participants,
        presenterId,
        startRecording,
        stopRecording,
    } = useMeeting({
        onRecordingStateChanged,
        onPresenterChanged,
        onSpeakerChanged,
        onMeetingJoined: () => {
            setJoined("JOINED");
        },
        onMeetingLeft: () => {
            props.onMeetingLeave();
        },
    });

    const handleStartRecording = () => {
        const config = {
            layout: {
                type: "GRID",
                priority: "SPEAKER",
                gridSize: 4,
            },
            theme: "DARK",
            mode: "video-and-audio",
            quality: "high",
            orientation: "landscape",
        };

        // Configuration for post transcription
        let transcription = {
            enabled: true,
            summary: {
                enabled: true,
                prompt:
                    "Write summary in sections like Title, Agenda, Speakers, Action Items, Outlines, Notes and Summary",
            },
        };

        startRecording(null, null, config, transcription);
        setActiveRecord(true)
    }
    const handleStopRecording = () => {
        // Stop Recording
        stopRecording();
        setActiveRecord(false)
    };

    const handleEndMeeting = () => {
        // Ending Meeting
        end();
        navigate("/")
    };

    const joinMeeting = () => {
        setJoined("JOINING");
        join();
    };

    const foundEntry = [...participants.entries()].find(([key, user]) => user.displayName.includes("instructor"));

    // console.log(foundEntry)
    if (foundEntry) {
        participants.set(foundEntry[0], foundEntry[1]);
        participants.delete(foundEntry[0]);
        participants.set(foundEntry[0], foundEntry[1]);
        [...participants.values()].reverse()
    }
    // console.log([...participants.values()])

    return (
        <div className="container min-vh-100 text-center">
            <h4>Meeting Id: {props.meetingId}</h4>
            {joined && joined == "JOINED" ? (
                <div className=" border p-2">
                    {userCredentials.user.role === "instructor" && (
                        <div style={{ bottom: "1.5rem" }} className='mb-2 position-absolue  end-0 top-0 fs_sm'>
                            <button
                                className="border-0 inherit_bg prime_brown me-2" onClick={handleStartRecording}><BsRecordCircle size={30} /></button>
                            <button
                                className="border-0 inherit_bg prime_brown" onClick={handleStopRecording}><BsStopCircle size={30} /></button>
                            <button
                                className="border-0 inherit_bg prime_brown" onClick={handleEndMeeting}><FcEndCall size={30} /></button>
                        </div>
                    )}
                    <div className="d-flex justify-content-center">
                        <div className="col-md-9">
                            <div className=" position-relative">
                                <div className="grid_container">
                                    {presenterId && <PresenterView presenterId={presenterId} />}
                                    {[...participants.keys()].reverse().map((participantId) => {
                                        return (
                                            <ParticipantView
                                                foundEntry={foundEntry}
                                                checkSpeaker={checkSpeaker}
                                                participantId={participantId}
                                                key={participantId}
                                            />
                                        )
                                    })}
                                </div>
                                {activeRecord && (
                                    <span
                                        style={{ width: "fitContent", backgroundColor: "hsla(0, 0%, 0%, 0.4)" }}
                                        className="border-0 bg- rounded-circle prime_brown me-2 position-absolute top-0 mt-2"><BsRecordCircle size={30} />
                                    </span>
                                )}
                            </div>
                            <Controls />
                        </div>
                    </div>
                </div>
            ) : joined && joined == "JOINING" ? (
                <Loading />
            ) : (
                <div className="d-flex mt-5 pt-md-5 align-items-center justify-content-center">
                    <div className="my-3 text-center">
                        <h4>Live class</h4>
                        <p className='fw-semibold'>{props.state.oneCourse?.title}</p>
                        <p>{day} | {props.state.list.start_time}</p>
                        <button className="btn brown_bg hover_effect text-white fs_sm text-nowrap" onClick={joinMeeting}> <MdArrowLeft />  Join</button>
                    </div>
                </div>
            )}
        </div>
    );
}
export default MeetingView;