const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const Socket = require('./socket')

class Server{

    constructor(){

      this.app = express()  
      this.server = http.createServer(this.app)

      this.io = socketio( this.server, {
        cors: {
            origin: "http://localhost:3000",
          }
      } );

    }

    configureSockets(){
        new Socket(this.io)
    }

    execute(){
        this.configureSockets()
        this.server.listen(8000)
    }

}

module.exports = Server