import React from 'react'

const Board = () => {

    return (
        <div>
            
            <div className='board'>
                {[...Array(9).keys()].map(key => {
                    return (
                        <div key={key} className='board__square' onClick={() => console.log('lol')}>
  
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Board
