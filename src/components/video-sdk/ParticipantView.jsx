import ReactPlayer from "react-player";
import AvatarDp from "./AvatarDp";
import Indicators from "./Indicators";
import { useEffect, useMemo, useRef } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";

function ParticipantView(props) {
    const micRef = useRef(null);

    //Callback for when the participant starts a stream
    function onStreamEnabled(stream) {
        if (stream.kind === 'share') {
            console.log("Share Stream On: onStreamEnabled", stream);
        }
    }

    //Callback for when the participant stops a stream
    function onStreamDisabled(stream) {
        if (stream.kind === 'share') {
            console.log("Share Stream Off: onStreamDisabled", stream);
        }
    }

    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
        useParticipant(props.participantId, {
            onStreamEnabled,
            onStreamDisabled
        });

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
    const currentSpeaker = props.participantId === props.checkSpeaker;
    return (
        <div className={`participant position-relative ${props.foundEntry ? "full_width min_vh_80" : ""}`} key={props.participantId}>
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
                        // height={"100%"}
                        width={"100%"}
                        style={{ border: currentSpeaker ? "4px solid #ab3335" : "" }}
                        url={videoStream}
                        className=" video_container mirror_effect d-flex"
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                )}
            </div>
            {!webcamOn && <AvatarDp
                participantId={props.participantId}
                checkSpeaker={props.checkSpeaker}
                webcamOn={webcamOn}
                micOn={micOn} />}
            <Indicators webcamOn={webcamOn} micOn={micOn} displayName={displayName} />
        </div>
    );
}

export default ParticipantView;