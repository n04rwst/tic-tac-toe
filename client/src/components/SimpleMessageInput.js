import React, {useState} from 'react';
import {useChannelStateContext} from "stream-chat-react";

function SimpleMessageInput() {
    const { channel } = useChannelStateContext();
    const [message, setMessage] = useState('');

    const handleSend = async () => {
        if (message.trim()) {
            await channel.sendMessage({ text: message });
            setMessage('');
        }
    };

    return (
        <div className="str-chat__input-flat str-chat__input-flat--send-button-active">
            <div className="str-chat__input-flat-wrapper">
                <div className="str-chat__input-flat--textarea-wrapper">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="custom-chat-input"
                    />
                </div>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default SimpleMessageInput;