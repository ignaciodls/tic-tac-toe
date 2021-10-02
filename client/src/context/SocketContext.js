import React from "react";
import { useSocket as uSocket } from "../hooks/useSocket";

const socketContext = React.createContext()

export function SocketProvider(props){

    const socket = uSocket('http://localhost:8000/')

    return <socketContext.Provider value={socket} {...props}/>

}

export function useSocket(){
    return React.useContext(socketContext)
}