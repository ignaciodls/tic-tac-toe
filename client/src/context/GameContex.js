import React, {useCallback, useMemo, useState} from "react";

const gameContext = React.createContext()

export function GameProvider(props){

    const initialState = useMemo(() => {
        return {
            board:
            [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ],
            mySymbol:null,
            opponentSymbol:null,
            myTurn:null,
            winner:null,
            waiting:true,
            gameEnded:false
        }
    
    },[])
    
    const [gameState, setGameState] = useState(initialState)

    const resetState = useCallback(() => {
        setGameState(initialState)
    },[initialState])

    const checkWin = useCallback((newBoard) => {

        //COLUMNS
        const columns = newBoard.map((_,idx) => {
                            return newBoard.map(row => row[idx])
                        })


        //DIAGONALS
        const diagonals = newBoard.reduce((acc, row, idx) => {
                            acc[0].push(row[idx])
                            acc[1].push(row[row.length - idx - 1])
                            return acc
                          },[[],[]])
        

        //CHECK THREE IN LINE - MY SYMBOL
        if(columns.some(col => col.join('') === gameState.mySymbol?.repeat(3)) ||
           newBoard.some(row => row.join('') === gameState.mySymbol?.repeat(3))   ||
           diagonals.some(diag => diag.join('') === gameState.mySymbol?.repeat(3))){

            return gameState.mySymbol
        }

        //CHECK THREE IN LINE OPPONENT'S SYMBOL
        if(columns.some(col => col.join('') === gameState.opponentSymbol?.repeat(3)) ||
        newBoard.some(row => row.join('') === gameState.opponentSymbol?.repeat(3))   ||
        diagonals.some(diag => diag.join('') === gameState.opponentSymbol?.repeat(3))){

         return gameState.opponentSymbol
     }

    },[gameState.mySymbol, gameState.opponentSymbol])
    
    const doMoveAndCheckWin = useCallback(({ x, y, symbol }) => {

        let newBoard = gameState.board.map((row,i) => {
            return row.map((sqr,j) => {

                if(x === i && y === j){
                    return symbol
                }

                return sqr

            })
        })
        
        setGameState(g => {
            
            return {
                ...g,
                board:newBoard
            }
        })

        return checkWin(newBoard)

    },[gameState.board, checkWin])

    const obj = {
        gameState,
        setGameState,
        doMoveAndCheckWin,
        resetState
    }

    return <gameContext.Provider value={obj} {...props}/>

}

export function useGame(){

    return React.useContext(gameContext)

}
