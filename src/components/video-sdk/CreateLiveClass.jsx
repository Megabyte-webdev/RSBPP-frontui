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
                {/* <button className="btn blue_bg text-light" onClick={onClick}>Join</button> */}
                {/* {" or "} */}
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
        <div className="my-4" key={props.participantId}>
            {/* <Controls webcamOn={webcamOn} micOn={micOn} /> */}
            <audio className="w-50" ref={micRef} autoPlay muted={isLocal} />
            <div className="w-100 my-3">
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
                        className={"w-10 col-3 rounded"}
                        //
                        // height={"200px"}
                        // width={"300px"}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                )}
                {!webcamOn && <AvatarDp webcamOn={webcamOn} micOn={micOn} />}
            </div>
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
            {/* <button className="video_btns me-2 border-0" style={{ backgroundColor: "#f00" }} onClick={() => leave()}><MdCallEnd color="#fff" size={20} /></button>
            <button className="video_btns blue_bg me-2 border-0" onClick={() => toggleMic()}>{speakerOn}</button>
            <button className="video_btns blue_bg me-2 border-0" onClick={() => toggleWebcam()}>{camOn}</button> */}
            <button className="video_btns brown_bg me-2 border-0" style={{ backgroundColor: "hsla(359, 54%, 44%, 0.2)" }} onClick={() => leave()}><MdCallEnd color="#fff" size={20} /></button>
            <button className="video_btns blue_bg me-2 border-0" onClick={() => toggleMic()}>{<IoMic color="#fff" size={20} />}</button>
            <button className="video_btns blue_bg me-2 border-0" onClick={() => toggleWebcam()}><CiVideoOn color="#fff" size={20} /></button>
        </div>
    );
}

function MeetingView(props) {
    const [joined, setJoined] = useState(null);
    // const { join } = useMeeting();

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

    const handleStopRecording = () => {
        // Stop Recording
        stopRecording();
    };

    return (
        <div className="container">
            <h3>Meeting Id: {props.meetingId}</h3>
            {joined && joined == "JOINED" ? (
                <div>
                    <Controls />
                    <div className="border d-flex">
                    {[...participants.keys()].map((participantId) => (
                        <ParticipantView
                            participantId={participantId}
                            key={participantId}
                        />
                    ))}
                    {/* <button onClick={handleStartRecording}>Start Recording</button>
                    <button onClick={handleStopRecording}>Stop Recording</button> */}
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

function CreateLiveClass({meetingCode, setMeetingCode}) {

    const { userCredentials } = useContext(UserContext)
    const [meetingId, setMeetingId] = useState(null);

    const getMeetingAndToken = async (id) => {
        const meetingId =
            id == null ? await createMeeting({ token: authToken }) : id;
        setMeetingId(meetingId);
        setMeetingCode(meetingId);
    };
// console.log(meetingCode)
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
                name: userCredentials.user.first_name,
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

export default CreateLiveClass;