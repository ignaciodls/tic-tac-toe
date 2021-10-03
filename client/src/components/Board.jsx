import React, { useCallback, useEffect } from 'react'
import { useGame } from '../context/GameContex'
import { useSocket } from '../context/SocketContext'
import Square from './Square'

const Board = () => {

    const { gameState, setGameState, doMoveAndCheckWin, resetState } = useGame()
    const socket = useSocket()

    const joinNewGame = useCallback(() => {
        resetState()
        socket?.emit('join')
    },[socket,resetState])

    useEffect(() => {
        socket?.emit('join')
    },[socket])

    useEffect(() => {
        socket?.on('start-game', ({ symbol }) => {
            setGameState(g => {

                return {
                    ...g,
                    mySymbol: symbol,
                    opponentSymbol: symbol === 'X' ? 'O' : 'X',
                    myTurn: symbol === 'X' ? true : false,
                    waiting:false
                }

            })
        })

        return () => socket?.off('start-game')

    },[socket, gameState.myTurn, gameState.mySymbol, setGameState])

    useEffect(() => {
        socket?.on('move', ({ x, y, symbol }) => {

            let winner = doMoveAndCheckWin({ x, y, symbol }) 

            if(winner){
                socket?.emit('game-ended', winner)
                return
            }

            setGameState(g => {
                return{
                    ...g,
                    myTurn: symbol !== gameState.mySymbol ? true : false
                }
            })
        })

        return () => socket?.off('move')

    },[socket, doMoveAndCheckWin, gameState.mySymbol, gameState.myTurn, setGameState])
    
    useEffect(() => {
        socket?.on('game-ended', (winnerSymbol) => {
            setGameState(g => {
                return {
                    ...g,
                    winner: winnerSymbol,
                    gameEnded:true
                }
            })
        })
    },[socket, setGameState])

    useEffect(() => {

        socket?.on('opponent-disconnected', () => {
            setGameState(g => {
                return {
                    ...g,
                    gameEnded:true
                }
            })
        })

    },[socket, setGameState])

    return (
        <div className='root'>

            <div className='title'>Tic-Tac-Toe</div>
            
            <div className='board'>
                {gameState.board.map((row,x) => {
                    return (
                        <div key={x} className='board__row'>
                            {
                                row.map((val,y) => {
                                    return (
                                        <Square key={y} x={x} y={y} val={val}/>
                                    )
                                })
                            }
                        </div>
                    )
                })}
            </div>
                {   
                    (gameState.gameEnded && !gameState.winner) ? 
                    <div className='result red-text'>
                        Opponent has disconnected
                    </div>:

                    gameState.waiting ? 
                    <div className = 'waiting'>
                        Waiting for opponent to join...
                    </div> :
                    
                    gameState.winner ?
                    gameState.winner === gameState.mySymbol ? 
                    <div className='result green'>
                        You won
                    </div> :

                    <div className='result red-text'>
                        You lose
                    </div> : 

                    gameState.myTurn ? 
                    <div className='turn'>Your turn</div>:
                    <div className='turn'>Opponent's turn</div>

                }
                {
                    (gameState.gameEnded) && 
                    <div className='button' onClick={joinNewGame}>Play Again</div>
                }
        </div>
        
    )
}

export default Board
