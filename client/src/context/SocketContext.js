import React, { useEffect, useState } from "react";

import socketio from 'socket.io-client'

const socketContext = React.createContext()

export function SocketProvider(props){

    const [socket, setSocket] = useState(null)

    useEffect(() => {
        setSocket(socketio('http://localhost:8000/',{
            forceNew:true,
        }))
    },[])

    return <socketContext.Provider value={socket} {...props}/>

}

export function useSocket(){
    return React.useContext(socketContext)
}