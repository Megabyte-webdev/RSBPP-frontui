// import "./App.css";
import { useEffect, useMemo, useRef, useState } from "react";
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
import { MdCallEnd } from "react-icons/md";

function JoinScreen({ getMeetingAndToken }) {
    const [meetingId, setMeetingId] = useState(null);
    const onClick = async () => {
        await getMeetingAndToken(meetingId);
    };
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
                <button className="btn blue_bg text-light" onClick={onClick}>Join</button>
                {" or "}
                <button className="btn blue_bg text-light" onClick={onClick}>Create Meeting</button>
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
        <div key={props.participantId}>
            <Controls webcamOn={webcamOn} micOn={micOn} />
            <p className="my-3">
                Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                {micOn ? "ON" : "OFF"}
            </p>
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
                        className={"w-100 rounded"}
                        //
                        // height={"200px"}
                        // width={"300px"}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                )}
            </div>
        </div>
    );
}

function Controls({ webcamOn, micOn }) {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    const camOn = webcamOn ? <CiVideoOn color="#fff" size={20} /> : <CiVideoOff color="#fff" size={20} />
    const speakerOn = micOn ? <IoMic color="#fff" size={20} /> : <IoMicOff color="#fff" size={20} />
    return (
        <div className="d-flex">
            <button className="video_btns me-2 border-0" style={{ backgroundColor: "#f00" }} onClick={() => leave()}><MdCallEnd color="#fff" size={20} /></button>
            <button className="video_btns blue_bg me-2 border-0" onClick={() => toggleMic()}>{speakerOn}</button>
            <button className="video_btns blue_bg me-2 border-0" onClick={() => toggleWebcam()}>{camOn}</button>
            {/* <button className="video_btns blue_bg me-2 border-0"  style={{ backgroundColor: "hsla(359, 54%, 44%, 0.2)" }} onClick={() => leave()}><MdCallEnd color="#fff" size={20} /></button>
            <button className="video_btns blue_bg me-2 border-0" onClick={() => toggleMic()}>{<IoMic color="#fff" size={20} />}</button>
            <button className="video_btns blue_bg me-2 border-0" onClick={() => toggleWebcam()}><CiVideoOn color="#fff" size={20} /></button> */}
        </div>
    );
}

function MeetingView(props) {
    const [joined, setJoined] = useState(null);
    const { join } = useMeeting();
    const { participants } = useMeeting({
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

    return (
        <div className="container">
            <h3>Meeting Id: {props.meetingId}</h3>
            {joined && joined == "JOINED" ? (
                <div>
                    {/* <Controls /> */}
                    {[...participants.keys()].map((participantId) => (
                        <ParticipantView
                            participantId={participantId}
                            key={participantId}
                        />
                    ))}
                </div>
            ) : joined && joined == "JOINING" ? (
                <p>Joining the meeting...</p>
            ) : (
                <button onClick={joinMeeting}>Join</button>
            )}
        </div>
    );
}

function VideoApp() {
    const [meetingId, setMeetingId] = useState(null);

    const getMeetingAndToken = async (id) => {
        const meetingId =
            id == null ? await createMeeting({ token: authToken }) : id;
        setMeetingId(meetingId);
    };

    const onMeetingLeave = () => {
        setMeetingId(null);
    };

    return authToken && meetingId ? (
        <MeetingProvider
            config={{
                meetingId,
                micEnabled: true,
                webcamEnabled: true,
                name: "C.V. Raman",
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