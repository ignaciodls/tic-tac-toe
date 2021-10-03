class Game{

    constructor(){

        this.unmatched = null
        this.players = {}

    }

    joinGame(socket){

        this.players[socket.id] = {
            opponent:this.unmatched,
            socket
        }

        if(this.unmatched){
            let symbols = ['X','O']
            
            this.players[this.unmatched].opponent = socket.id

            this.players[socket.id].symbol = symbols.splice(Math.floor(Math.random() * (2)),1)[0]
            this.players[this.unmatched].symbol = symbols[0]

            this.unmatched = null
        }
        else{
            this.unmatched = socket.id
        }
    }

    getOpponent(socket){
        if(!this.players[socket.id].opponent) return

        return this.players[this.players[socket.id].opponent].socket
    }

    disconnectPlayer(socket){

        if(this.getOpponent(socket)){
            this.players[this.getOpponent(socket).id].opponent = null
        }

        if(this.unmatched === socket.id){
            this.unmatched = null
        }

        delete this.players[socket.id]

    }

}

const game = new Game()

module.exports = game