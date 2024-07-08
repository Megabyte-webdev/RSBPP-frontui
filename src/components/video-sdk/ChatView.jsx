// importing usePubSub hook from react-sdk
import { usePubSub } from "@videosdk.live/react-sdk";
import { useState } from "react";

function ChatView() {
    // function onMessageReceived(message) {
    //     console.log("New Message:", message);
    // }

    // function onOldMessagesReceived(messages) {
    //     console.log("Old Messages:", messages);
    // }

    const { publish, messages } = usePubSub("CHAT", {
        onMessageReceived: (message)=>{
          window.alert(message.senderName + "says" + message.message);
        }
      });

    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        // Sending the Message using the publish method
        publish(message, { persist: true });

        // Clearing the message input
        setMessage("");
    };

    console.log(messages)

    return (
        <div>
            <div>
                <p>Messages: </p>
                {messages.map((message) => {
                    return (
                        <p key={message.senderId}>
                            {message.senderName} says {message.message}
                        </p>
                    );
                })}
            </div>
            <input
            type="text"
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                }}
            />
            <button onClick={handleSendMessage}>Send Message</button>
        </div>
    );
}

export default ChatView;