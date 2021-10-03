const game = require('../game')

class Socket{

    constructor(io){

        this.io = io
        this.socketEvents()

    }

    socketEvents(){

        this.io.on('connection',(socket) => {

            socket.on('join', () => {
                game.joinGame(socket)

                if(game.getOpponent(socket)){
                    socket.emit('start-game',{ symbol: game.players[socket.id].symbol})
                    game.getOpponent(socket).emit('start-game',{ symbol: game.players[game.getOpponent(socket).id].symbol})
                }
            })

            socket.on('move', (x, y, symbol) => {
                socket.emit('move', {x, y, symbol})
                game.getOpponent(socket).emit('move', {x, y, symbol})
            })

            socket.on('game-ended', winnerSymbol => {
                socket.emit('game-ended', winnerSymbol)
                game.getOpponent(socket).emit('game-ended', winnerSymbol)
            })

            socket.on('draw', () => {
                socket.emit('draw')
                game.getOpponent(socket).emit('draw')
            })
            
            socket.on('disconnecting', () => {

                if(game.getOpponent(socket)){
                    game.getOpponent(socket).emit('opponent-disconnected')
                }

                game.disconnectPlayer(socket)

            })

        })

    }

}

module.exports = Socket