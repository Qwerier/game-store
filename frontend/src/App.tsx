import { useEffect, useState } from 'react'
import './App.css'
import { Game } from './app/models/Game'
import Catalog from './features/catalog/Catalog';

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
      <Catalog games={games} />
    </>
  )
}

export default App
