import React, {useState} from "react";
import {useChatContext, Channel} from "stream-chat-react"
import Game from "./Game";
import "../styles/JoinGame.css"

function JoinGame({logout}) {
    const [channel, setChannel] = useState(null);
    const [rivalUsername, setRivalUsername] = useState('');
    const {client} = useChatContext();

    const createChannel = async () => {
        const response = await client.queryUsers({name: {$eq: rivalUsername}});

        if (response.users.length === 0) {
            alert("User not found");
            return;
        }

        const newChannel = await client.channel("messaging", {
            members: [client.userID, response.users[0].id],
        });

        await newChannel.watch();
        setChannel(newChannel);
    };

    return (
        <>
            {channel ? (
                <Channel channel={channel}>
                    <Game channel={channel} setChannel={setChannel} />
                </Channel>
            ) : (
                <div className="join-game-container">
                    <h2>Join a Game</h2>
                    <input
                        type="text"
                        placeholder="Enter rival's username..."
                        onChange={event => setRivalUsername(event.target.value)}
                        className="join-input"
                    />

                    <div className="join-game-btns">
                        <button onClick={createChannel}>Join!</button>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
            )}
        </>
    );

}

export default JoinGame;