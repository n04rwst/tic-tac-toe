import React, {useEffect, useState} from 'react';
import {useChannelStateContext, useChatContext} from "stream-chat-react"
import Square from "./Square";
import {WinningPatterns} from "../WinningPatterns";
import "../styles/Board.css"

function Board({result, setResult}) {
    const [board, setBoard] = useState([
        "", "", "",
        "", "", "",
        "", "", ""
    ]);

    const [player, setPlayer] = useState("X");
    const [turn, setTurn] = useState("X");

    const {channel} = useChannelStateContext();
    const {client} = useChatContext();

    useEffect(() => {
        checkIfTie();
        checkWin();
    }, [board])

    const chooseSquare = async (square) => {
        if (turn === player && board[square] === "") {
            setTurn(player === "X" ? "O" : "X");

            await channel.sendEvent({
                type: "game-move",
                data: {square, player}
            });

            setBoard(board.map((value, index) => {
                if (index === square && value === "") return player;
                return value;
            }));
        }
    };

    const checkWin = () => {
        WinningPatterns.forEach(pattern => {
            const firstTurn = board[pattern[0]];
            if (firstTurn === "") return;

            let isFound = true;
            pattern.forEach((index) => {
                if (board[index] !== firstTurn) {
                    isFound = false;
                }
            })

            if (isFound) {
                setResult({...result, winner: firstTurn, state: "won"});
            }
        });
    }

    const checkIfTie = () => {
        let isFilled = true;
        board.forEach(square => {
            if (square === "") isFilled = false;
        })

        if (isFilled) {
            setResult({...result, winner: "none", state: "tie"});
        }
    }

    const restartGame = async () => {
        await channel.sendEvent({
            type: "game-restart",
        });

        resetBoard();
    };

    const resetBoard = () => {
        setBoard(["", "", "", "", "", "", "", "", ""]);
        setTurn("X");
        setPlayer("X");
        setResult({ winner: "none", state: "none" });
    };

    useEffect(() => {
        const handleEvent = (event) => {
            if (event.type === "game-move" && event.user.id !== client.userID) {
                const currentPlayer = event.data.player === "X" ? "O" : "X";
                setPlayer(currentPlayer);
                setTurn(currentPlayer);

                setBoard((prev) =>
                    prev.map((val, index) =>
                        index === event.data.square && val === "" ? event.data.player : val
                    )
                );
            }

            if (event.type === "game-restart") {
                resetBoard();
            }
        };

        channel.on(handleEvent);

        return () => {
            channel.off(handleEvent);
        };
    }, [channel, client.userID]);


    return (
        <div className="boardContainer">
            <div className="board">
                {board.map((value, index) => (
                    <Square key={index} value={value} chooseSquare={() => chooseSquare(index)}/>
                ))}
            </div>

            <button onClick={restartGame} className="restartButton">Restart</button>
        </div>

    );

}

export default Board;