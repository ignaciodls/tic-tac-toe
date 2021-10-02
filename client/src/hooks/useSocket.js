import { useEffect, useState } from 'react'

import socketio from 'socket.io-client'

export const useSocket = (serverPath) => {

    const [socket, setSocket] = useState(null)

    useEffect(() => {
        setSocket(socketio(serverPath))
    },[serverPath])


    return socket

}
