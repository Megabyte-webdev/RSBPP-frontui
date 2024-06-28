// import "./App.css";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
    MeetingProvider,
    MeetingConsumer,
    useMeeting,
    useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "./API";
import ReactPlayer from "react-player";
import { CiVideoOff, CiVideoOn } from "react-icons/ci";
import { IoMic, IoMicOff } from "react-icons/io5";
import { MdArrowLeft, MdCallEnd } from "react-icons/md";
import { UserContext } from "../../context/AuthContext";
import Indicators from "./Indicators";
import AvatarDp from "./AvatarDp";

function JoinScreen({ getMeetingAndToken }) {
    const { userCredentials } = useContext(UserContext)
    const [meetingId, setMeetingId] = useState(null);
    const onClick = async () => {
        await getMeetingAndToken(meetingId);
    };

    const studentRole = userCredentials.user?.role === "student"
    return (
        <div>
            <input
                className="w-50 py-2 rounded-pill border px-3"
                type="text"
                placeholder="Enter Meeting Id"
                onChange={(e) => {
                    setMeetingId(e.target.value);
                }}
            />
            <div className="my-3">
                {/* <button className="btn blue_bg text-light">Join</button> */}
                {!studentRole && (
                    <button className="btn blue_bg text-light" onClick={onClick}>Create Meeting</button>
                )}
            </div>
        </div>
    );
}

function ParticipantView(props) {
    const micRef = useRef(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
        useParticipant(props.participantId);
    // console.log(props.participantId.displayName)
    const videoStream = useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);

    useEffect(() => {
        if (micRef.current) {
            if (micOn && micStream) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);
                // console.log(props.participantsId)
                micRef.current.srcObject = mediaStream;
                micRef.current
                    .play()
                    .catch((error) =>
                        console.error("videoElem.current.play() failed", error)
                    );
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn]);
    return (
        <div className={props.foundEntry ? "participant position-relative full_width" : "participant position-relative"} key={props.participantId}>
            {/* <Controls webcamOn={webcamOn} micOn={micOn} /> */}
            <audio ref={micRef} autoPlay muted={isLocal} />
            <div className={webcamOn ? "w-100 h-100" : ""}>
                {webcamOn && (
                    <ReactPlayer
                        //
                        playsinline // very very imp prop
                        pip={false}
                        light={false}
                        controls={false}
                        muted={true}
                        playing={true}
                        //
                        url={videoStream}
                        className={"w-100 h-100 video_container"}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                )}
            </div>
            {!webcamOn && <AvatarDp webcamOn={webcamOn} micOn={micOn} />}
            <Indicators webcamOn={webcamOn} micOn={micOn} displayName={displayName} />
        </div>
    );
}

function Controls() {
    const { leave, toggleMic, toggleWebcam, webcamOn, micOn } = useMeeting();
    // console.log(micOn)
    // const camOn = webcamOn ? <CiVideoOn color="#fff" size={20} /> : <CiVideoOff color="#fff" size={20} />
    // const speakerOn = micOn ? <IoMic color="#fff" size={20} /> : <IoMicOff color="#fff" size={20} />
    return (
        <div className="d-flex">
            <button className="video_btns brown_bg me-2 border-0" style={{ backgroundColor: "hsla(359, 54%, 44%, 0.2)" }} onClick={() => leave()}><MdCallEnd color="#fff" size={20} /></button>
            <button className="video_btns blue_bg me-2 border-0" onClick={() => toggleMic()}>{<IoMic color="#fff" size={20} />}</button>
            <button className="video_btns blue_bg me-2 border-0" onClick={() => toggleWebcam()}><CiVideoOn color="#fff" size={20} /></button>
        </div>
    );
}

function MeetingView(props) {
    const { userCredentials } = useContext(UserContext)
    const [joined, setJoined] = useState(null);
    // const { join } = useMeeting();
    const role = userCredentials.user?.role
    const firstName = userCredentials.user?.first_name
    const { join, participants, startRecording, stopRecording } = useMeeting({
        onMeetingJoined: () => {
            setJoined("JOINED");
        },
        onMeetingLeft: () => {
            props.onMeetingLeave();
        },
    });
    const joinMeeting = () => {
        setJoined("JOINING");
        join();
    };

    const handleStartRecording = () => {
        // Configuration for recording
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

        // Start Recording
        // If you don't have a `webhookUrl` or `awsDirPath`, you should pass null.
        startRecording(
            "YOUR WEB HOOK URL",
            "AWS Directory Path",
            config,
            transcription
        );
    };
    // participants?.find((user) => user.value.displayName == firstName && role == "instructor")
    //  const foundEntry = [...participants.values()]?.find((user) =>  user.displayName === firstName && role == "instructor")
    const foundEntry = [...participants.entries()].find(([key, user]) => user.displayName.includes("instructor"));
    // const foundEntry = [...participants.values()]?.find((user) =>  user.displayName === firstName && role == "instructor")
    //  if (foundEntry) {
    //      let index = [...participants.values()].indexOf(foundEntry);
    //      [...participants.values()].splice(index, 1);
    //      [...participants.values()].unshift(foundEntry);
    //    } 
    // console.log([...participants.values()])

    console.log(foundEntry)
    if (foundEntry) {
        participants.set(foundEntry[0], foundEntry[1]);
        participants.delete(foundEntry[0]);
        participants.set(foundEntry[0], foundEntry[1]);
        [...participants.values()].reverse()
    }
    console.log([...participants.values()])

    const handleStopRecording = () => {
        // Stop Recording
        stopRecording();
    };
    return (
        <div className="container">
            <h3>Meeting Id: {props.meetingId}</h3>
            {joined && joined == "JOINED" ? (
                <div className="d-flex w-100 justify-content-center">
                    <div className="col-md-7">
                        <div className="border p-2">
                            <div className="grid_container">
                                {/* {foundEntry &&(
                            <ParticipantView
                            // foundEntry={foundEntry}
                            participantId={foundEntry[1]}
                            key={foundEntry[0]}
                        />
                           )}  */}
                                {[...participants.keys()].reverse().map((participantId) => (
                                    <ParticipantView
                                        foundEntry={foundEntry}
                                        participantId={participantId}
                                        key={participantId}
                                    />
                                ))}
                                {/* <button onClick={handleStartRecording}>Start Recording</button>
                    <button onClick={handleStopRecording}>Stop Recording</button> */}
                            </div>
                        </div>
                        <Controls />

                    </div>
                </div>
            ) : joined && joined == "JOINING" ? (
                <p>Joining the meeting...</p>
            ) : (
                <button className="btn brown_bg text-white fs_sm text-nowrap" onClick={joinMeeting}> <MdArrowLeft />  Join</button>
            )}
        </div>
    );
}

function VideoApp({ state }) {
    const { userCredentials } = useContext(UserContext)
    const user = userCredentials?.user
    const getName = () => {
        if (user.role === "instructor") {
            return `instructor ${user.first_name}`
        } else {
            return user.first_name
        }
    }
    const [meetingId, setMeetingId] = useState(state.list.meeting_code);
    console.log(state)

    const getMeetingAndToken = async (id) => {
        const meetingId =
            id == null ? await createMeeting({ token: authToken }) : id;
        setMeetingId(meetingId);
    };
    // console.log(meetingId)
    const onMeetingLeave = () => {
        setMeetingId(null);
    };
    return authToken && meetingId ? (
        <MeetingProvider
            config={{
                meetingId,
                micEnabled: true,
                webcamEnabled: true,
                screenShareEnabled: true,
                chatEnabled: true,
                raiseHandEnabled: true,
                name: getName(),
            }}
            token={authToken}
        >
            <MeetingConsumer>
                {() => (
                    <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
                )}
            </MeetingConsumer>
        </MeetingProvider>
    ) : (
        <JoinScreen getMeetingAndToken={getMeetingAndToken} />
    );
}

export default VideoApp;