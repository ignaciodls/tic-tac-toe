class Socket{

    constructor(io){

        this.io = io
        this.socketEvents()

    }

    socketEvents(){
        this.io.on('connection',(socket) => {
            console.log('con')
        })

    }

}

module.exports = Socket