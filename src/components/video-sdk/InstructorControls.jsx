import { Constants, useMeeting } from '@videosdk.live/react-sdk';
import { useState } from 'react'
import { BsRecordCircle, BsStopCircle } from 'react-icons/bs';
import { FcEndCall } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const InstructorControls = () => {
    const navigate = useNavigate()

    const [activeRecord, setActiveRecord] = useState(false)
    const [isMicOn, setIsMicOn] = useState(false)


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

    const { end,
        startRecording,
        participants,
        stopRecording,
    } = useMeeting({
        onRecordingStateChanged,
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

    function handleMuteAllParticipant() {
        [...participants.values()].forEach((participant) => {
            if (!participant.local) {
                // console.log("herehere");
                // participant.remove();
                // participant.unmuteMic(); 
                participant.disableMic();
            }
        });
        setIsMicOn(true)
    }

    function handleUnMuteAllParticipant() {
        [...participants.values()].forEach((participant) => {
            if (!participant.local) {
                // console.log("herehere");
                // participant.remove();
                // participant.unmuteMic(); 
                participant.enableMic();
            }
        });
        setIsMicOn(false)
    }

    return (
        <div style={{ bottom: "1.5rem" }} className='mb-2 position-absolue  end-0 top-0 fs_sm'>
            <button
                className="border-0 inherit_bg prime_brown me-2" onClick={handleStartRecording}><BsRecordCircle size={30} /></button>
            <button
                className="border-0 inherit_bg prime_brown text-black" onClick={handleStopRecording}><BsStopCircle className=" text-black" size={30} /></button>
            <button
                className="border-0 inherit_bg prime_brown" onClick={handleEndMeeting}><FcEndCall size={30} /></button>
            <button
                className={` btn btn-sm border_color_brown border ${isMicOn ? "brown_bg text-white" : ""}`} onClick={handleMuteAllParticipant}>Mute All</button>
            <button
                className={` btn btn-sm border_color_brown border ms-3 ${!isMicOn ? "brown_bg text-white" : ""}`} onClick={handleUnMuteAllParticipant}>Unmute All</button>
        </div>
    )
}

export default InstructorControls