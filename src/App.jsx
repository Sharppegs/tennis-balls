import Tournament from "./pages/Tournament"
import Game from "./pages/Game"
import { Navbar } from "./components/Navbar"
import {Route, Routes } from 'react-router-dom' 




function App() {



   return (
    <div className="app-layout">
     
      <Navbar />
    <div className="container">
      <Routes>
        <Route path="/" element={<Tournament />} />
        <Route path="/game/:id" element={<Game />} />      
      </Routes>
    </div>
    </div>
  )
}

export default App
