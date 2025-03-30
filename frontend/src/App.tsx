import { useEffect, useState } from 'react'
import './App.css'
import { Game } from './app/models/Game'
import Catalog from './features/catalog/Catalog';

function App() {

  return (
    <>
      <div>
        GameStore
      </div>
      <Catalog/>
    </>
  )
}

export default App
