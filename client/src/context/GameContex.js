import React from "react";

const gameContext = React.createContext()

export function GameProvider(props){


    return <gameContext.Provider {...props}/>

}

export function useGame(){

    return React.useContext(gameContext)

}
