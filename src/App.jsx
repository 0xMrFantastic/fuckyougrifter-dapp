import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Mint from './pages/Mint'
import Explorer from './pages/Explorer'
import Viewer from './pages/Viewer'
import Stats from './pages/Stats'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <header>
        <h1>FuckYouGrifter</h1>
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/mint">Mint</Link> | 
          <Link to="/explorer">Explorer</Link> | 
          <Link to="/viewer">Viewer</Link> | 
          <Link to="/stats">Stats</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/viewer" element={<Viewer />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App