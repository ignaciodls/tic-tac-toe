import React from 'react'
import { useGame } from '../context/GameContex'
import { useSocket } from '../context/SocketContext'

const Square = ({ x, y, val }) => {
    
    const { gameState,setGameState } = useGame()
    const socket = useSocket()

    const handleClick = (e) => { 
        if(gameState.myTurn && !gameState.gameEnded && e.target.textContent === ''){
            socket?.emit('move',  x, y, gameState.mySymbol)

            //PATCH FAST CLICK
            setGameState({
                ...gameState,
                myTurn:false
            })

        }
    }

    return (
        <div className={`board__square ${val === 'X' ? 'red' : 'green'}`} onClick={handleClick}>
            { val }
        </div>
    )
}

export default Square
