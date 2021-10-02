import Board from './components/Board';
import { GameProvider } from './context/GameContex';
import { SocketProvider } from './context/SocketContext'

import './style/global.css'

function App() {
  
  return (
    <div>
      <SocketProvider>
        <GameProvider>
          <Board/>
        </GameProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
