import { useEffect, useState } from 'react'
import './App.css'
import { Game } from './models/Game'

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("https://localhost:5200/api/games")
      .then(response => response.json())
      .then(data => setGames(data))
      .catch(err => console.log(err))
  }, []);

  return (
    <>
      <div>
        GameStore
      </div>

      <ul>
        {
          games.map((game,index) => (
            <li key={index}>{game.id} - {game.playerModeId} - {game.playerMode.playerMode}</li>
          ))
        }
      </ul>
    </>
  )
}

export default App
