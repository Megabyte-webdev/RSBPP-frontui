import chatsImage from "../../assets/chats-img.png"

const VideoChats = () => {
  return (
    <div className="mb-3">
        <div className="d-flex">
            <div className="chat_img me-3">
                <img src={chatsImage} alt="" className="img-fluid " />
            </div>
            <div className="rounded px-2 py-1 w-100" style={{ backgroundColor: "hsla(0, 5%, 90%, 1)" }}>
                <p className="fs_xsm">Dari Dalong</p>
                <p>Good afternoon, everyone here. We will start this meeting soon</p>
            </div>
        </div>
    </div>
  )
}

export default VideoChats