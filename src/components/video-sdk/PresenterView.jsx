import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useMemo } from "react";
import ReactPlayer from "react-player";

const PresenterView = ({ presenterId }) => {
  const { screenShareStream, screenShareOn } = useParticipant(presenterId);

  //Creating a media stream from the screen share stream
  const mediaStream = useMemo(() => {
    if (screenShareOn && screenShareStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(screenShareStream.track);
      return mediaStream;
    }
  }, [screenShareStream, screenShareOn]);

  return (
    <div className="participant position-relative full_width">
      {/* playing the media stream in the ReactPlayer */}
      <div className="w-100 h-100">
        <ReactPlayer
          //
          playsinline // extremely crucial prop
          playIcon={<></>}
          //
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          //
          url={mediaStream} // passing mediastream here
          //
          height={"100%"}
          width={"100%"}
          onError={(err) => {
            console.log(err, "presenter video error");
          }}
        />
      </div>
    </div>
  );
};

export default PresenterView;