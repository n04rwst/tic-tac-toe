import React, {useState} from "react";
import Board from "./Board";
import {Window, MessageList} from "stream-chat-react";
import "../styles/Chat.css";
import "../styles/Game.css"
import SimpleMessageInput from "./SimpleMessageInput";

function Game({channel, setChannel}) {
    const [isPlayersJoined, setIsPlayersJoined] = useState(
        channel.state.watcher_count === 2
    );

    const [result, setResult] = useState({winner: "none", state: "none"});

    channel.on("user.watching.start", event => {
        setIsPlayersJoined(event.watcher_count === 2)
    });

    if (!isPlayersJoined) {
        return <div className="waiting">Waiting for other player to join...</div>
    }

    return (
        <>
            <div className="resultContainer">
                {result.state === "won" && (<div className="gameResult">Player {result.winner} Won The Game!</div>)}
                {result.state === "tie" && (<div className="gameResult">Game Tied!</div>)}
            </div>

            <div className="gameContainer">
                <Board result={result} setResult={setResult}/>

                <div className="chatContainer">
                    <Window>
                        <MessageList
                            disableDateSeparator
                            closeReactionSelectorOnClick
                            hideDeletedMessages
                            messageActions={null}
                        />
                        <SimpleMessageInput/>
                    </Window>
                </div>

                <div className="gameControls">
                    <button className="leaveButton" onClick={async () => {
                        await channel.stopWatching();
                        setChannel(null);
                    }}>
                        Leave Game
                    </button>
                </div>
            </div>
        </>
    );
}

export default Game;