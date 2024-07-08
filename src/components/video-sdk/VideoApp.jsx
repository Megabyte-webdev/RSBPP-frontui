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
import { MdArrowLeft, MdCallEnd, MdOutlineCancelPresentation } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { UserContext } from "../../context/AuthContext";
import Indicators from "./Indicators";
import AvatarDp from "./AvatarDp";
import PresenterView from "./PresenterView";
import { useNavigate } from "react-router-dom";
import MeetingView from "./MeetingView";

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

// function ParticipantView(props) {
//     const micRef = useRef(null);

//     //Callback for when the participant starts a stream
//     function onStreamEnabled(stream) {
//         if (stream.kind === 'share') {
//             console.log("Share Stream On: onStreamEnabled", stream);
//         }
//     }

//     //Callback for when the participant stops a stream
//     function onStreamDisabled(stream) {
//         if (stream.kind === 'share') {
//             console.log("Share Stream Off: onStreamDisabled", stream);
//         }
//     }

//     const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
//         useParticipant(props.participantId, {
//             onStreamEnabled,
//             onStreamDisabled
//         });

//     const videoStream = useMemo(() => {
//         if (webcamOn && webcamStream) {
//             const mediaStream = new MediaStream();
//             mediaStream.addTrack(webcamStream.track);
//             return mediaStream;
//         }
//     }, [webcamStream, webcamOn]);

//     useEffect(() => {
//         if (micRef.current) {
//             if (micOn && micStream) {
//                 const mediaStream = new MediaStream();
//                 mediaStream.addTrack(micStream.track);
//                 // console.log(props.participantsId)
//                 micRef.current.srcObject = mediaStream;
//                 micRef.current
//                     .play()
//                     .catch((error) =>
//                         console.error("videoElem.current.play() failed", error)
//                     );
//             } else {
//                 micRef.current.srcObject = null;
//             }
//         }
//     }, [micStream, micOn]);
//     const currentSpeaker = props.participantId === props.checkSpeaker;
//     return (
//         <div className={`participant position-relative ${props.foundEntry ? "full_width" : ""}`} key={props.participantId}>
//             {/* <Controls webcamOn={webcamOn} micOn={micOn} /> */}
//             <audio ref={micRef} autoPlay muted={isLocal} />
//             <div className={webcamOn ? "w-100 h-100" : ""}>
//                 {webcamOn && (
//                     <ReactPlayer
//                         //
//                         playsinline // very very imp prop
//                         pip={false}
//                         light={false}
//                         controls={false}
//                         muted={true}
//                         playing={true}
//                         //
//                         height={"100%"}
//                         width={"100%"}
//                         style={{ border: currentSpeaker ? "4px solid #ab3335" : "" }}
//                         url={videoStream}
//                         className=" video_container mirror_effect d-flex"
//                         onError={(err) => {
//                             console.log(err, "participant video error");
//                         }}
//                     />
//                 )}
//             </div>
//             {!webcamOn && <AvatarDp
//                 participantId={props.participantId}
//                 checkSpeaker={props.checkSpeaker}
//                 webcamOn={webcamOn}
//                 micOn={micOn} />}
//             <Indicators webcamOn={webcamOn} micOn={micOn} displayName={displayName} />
//         </div>
//     );
// }

// function Controls() {
//     const navigate = useNavigate()
//     const {
//         enableScreenShare,
//         disableScreenShare,
//         toggleScreenShare,
//         leave, toggleMic, toggleWebcam, webcamOn, micOn } = useMeeting();

//     const handleEnableScreenShare = () => {
//         // Enabling screen share
//         enableScreenShare();
//     };

//     const handleDisableScreenShare = () => {
//         // Disabling screen share
//         disableScreenShare();
//     };

//     const handleToggleScreenShare = () => {
//         // Toggling screen share
//         toggleScreenShare();
//     };

//     const leaveMeetingToHome = () => {
//         // Toggling screen share
//         leave();
//         navigate("/")
//     };
//     // console.log(micOn)
//     // const camOn = webcamOn ? <CiVideoOn color="#fff" size={20} /> : <CiVideoOff color="#fff" size={20} />
//     // const speakerOn = micOn ? <IoMic color="#fff" size={20} /> : <IoMicOff color="#fff" size={20} />
//     return (
//         <div className="d-flex">
//             <button className="video_btns brown_bg me-2 border-0" style={{ backgroundColor: "hsla(359, 54%, 44%, 0.2)" }} onClick={() => leaveMeetingToHome()}><MdCallEnd color="#fff" size={20} /></button>
//             <button className="video_btns blue_bg me-2 border-0" onClick={() => toggleMic()}>{<IoMic color="#fff" size={20} />}</button>
//             <button className="video_btns blue_bg me-2 border-0" onClick={() => toggleWebcam()}><CiVideoOn color="#fff" size={20} /></button>
//             <button className="video_btns blue_bg me-2 border-0" onClick={handleEnableScreenShare}><FiUpload color="#fff" size={20} /></button>
//             <button
//                 style={{ backgroundColor: "hsla(0, 79%, 63%, 0.4)" }}
//                 className="video_btns me-2 border-0 prime_brown" onClick={handleDisableScreenShare}><MdOutlineCancelPresentation size={20} /></button>
//             {/* <button className="video_btns blue_bg me-2 border-0" onClick={handleToggleScreenShare}>Toggle Screen Share</button> */}

//         </div>
//     );
// }

// function MeetingView(props) {
//     const { userCredentials } = useContext(UserContext)
//     const [joined, setJoined] = useState(null);
//     const [checkSpeaker, setCheckSpeaker] = useState(null);
//     const role = userCredentials.user?.role
//     const firstName = userCredentials.user?.first_name

//     //Callback for when the presenter changes
//     function onPresenterChanged(presenterId) {
//         if (presenterId) {
//             console.log(presenterId, "started screen share");
//         } else {
//             console.log("someone stopped screen share");
//         }
//     }

//     // Callback when speaker changes
//     function onSpeakerChanged(activeSpeakerId) {
//         // console.log(" onSpeakerChanged", activeSpeakerId);
//         setCheckSpeaker(activeSpeakerId);
//     }

//     const { join,
//         participants,
//         presenterId,
//         startRecording,
//         stopRecording,
//     } = useMeeting({
//         onPresenterChanged,
//         onSpeakerChanged,
//         onMeetingJoined: () => {
//             setJoined("JOINED");
//         },
//         onMeetingLeft: () => {
//             props.onMeetingLeave();
//         },
//     });

//     const config = {
//         layout: {
//           type: "GRID",
//           priority: "SPEAKER",
//           gridSize: 4,
//         },
//         theme: "DARK",
//         mode: "video-and-audio",
//         quality: "high",
//         orientation: "landscape",
//       };

//       // Configuration for post transcription
//       let transcription = {
//         enabled: true,
//         summary: {
//           enabled: true,
//           prompt:
//             "Write summary in sections like Title, Agenda, Speakers, Action Items, Outlines, Notes and Summary",
//         },
//       };

//       startRecording(null, null, config, transcription);
//       const handleStopRecording = () => {
//         // Stop Recording
//         stopRecording();
//       };

//     const joinMeeting = () => {
//         setJoined("JOINING");
//         join();
//     };

//     const foundEntry = [...participants.entries()].find(([key, user]) => user.displayName.includes("instructor"));

//     // console.log(foundEntry)
//     if (foundEntry) {
//         participants.set(foundEntry[0], foundEntry[1]);
//         participants.delete(foundEntry[0]);
//         participants.set(foundEntry[0], foundEntry[1]);
//         [...participants.values()].reverse()
//     }
//     // console.log([...participants.values()])

//     return (
//         <div className="container">
//             <h3>Meeting Id: {props.meetingId}</h3>
//             {joined && joined == "JOINED" ? (
//                 <div className="d-flex w-100 justify-content-center">
//                     <div className="col-md-7">
//                         <div className="border p-2">
//                             <div className="grid_container">
//                                 {presenterId && <PresenterView presenterId={presenterId} />}
//                                 {[...participants.keys()].reverse().map((participantId) => {
//                                     // console.log(participantId)
//                                     // console.log(checkSpeaker)
//                                     // const currentSpeaker = participantId == checkSpeaker;
//                                     // console.log(currentSpeaker)
//                                     return (
//                                         <ParticipantView
//                                             foundEntry={foundEntry}
//                                             checkSpeaker={checkSpeaker}
//                                             participantId={participantId}
//                                             key={participantId}
//                                         />
//                                     )
//                                 })}
//                                 {/* <button onClick={handleStartRecording}>Start Recording</button>
//                     <button onClick={handleStopRecording}>Stop Recording</button> */}
//                             </div>
//                         </div>
//                         <Controls />
//                         {/* <button onClick={handleEnableScreenShare}>Enable Screen Share</button>
//                         <button onClick={handleDisableScreenShare}>Disable Screen Share</button>
//                         <button onClick={handleToggleScreenShare}>Toggle Screen Share</button> */}
//                     </div>
//                 </div>
//             ) : joined && joined == "JOINING" ? (
//                 <p>Joining the meeting...</p>
//             ) : (
//                 <button className="btn brown_bg text-white fs_sm text-nowrap" onClick={joinMeeting}> <MdArrowLeft />  Join</button>
//             )}
//         </div>
//     );
// }

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

    const togggleAllowMod = () => {
        if (getName().includes("instructor")){
            return true
        } else {
            return false
        }
    }
    const [meetingId, setMeetingId] = useState(state.list.meeting_code);

    console.log(togggleAllowMod())

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
                allow_mod: togggleAllowMod,
                meetingId,
                // micEnabled: true,
                // webcamEnabled: true,
                screenShareEnabled: true,
                chatEnabled: true,
                raiseHandEnabled: true,
                name: getName(),
            }}
            token={authToken}
        >
            <MeetingConsumer>
                {() => (
                    <MeetingView state={state} meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
                )}
            </MeetingConsumer>
        </MeetingProvider>
    ) : (
        <JoinScreen getMeetingAndToken={getMeetingAndToken} />
    );
}

export default VideoApp;