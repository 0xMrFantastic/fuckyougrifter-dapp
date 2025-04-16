import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Mint from './pages/Mint'
import Explorer from './pages/Explorer'
import Viewer from './pages/Viewer'
import Stats from './pages/Stats'
import Submit from './pages/Submit'
import useWallet from './hooks/useWallet'

function App() {
  const { address, connect } = useWallet()
  const owner = '0xe0b0487Bcb7D0b73edCeb90794056DC891AcBc69'
  const isOwner = address?.toLowerCase() === owner.toLowerCase()

  return (
    <Router>
      <header>
        <h1>FuckYouGrifter</h1>

        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/mint">Mint</Link> |{" "}
          <Link to="/explorer">Explorer</Link> |{" "}
          <Link to="/viewer">Viewer</Link> |{" "}
          <Link to="/stats">Stats</Link> |{" "}
          <Link to="/submit">Submit</Link>
        </nav>

        <div style={{ marginTop: '10px' }}>
          {!address ? (
            <button onClick={connect}>🦊 Connect Wallet</button>
          ) : (
            <p>
              ✅ Connected: {address.slice(0, 6)}...{address.slice(-4)}
              {isOwner && " (Owner)"}
            </p>
          )}
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/viewer" element={<Viewer />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/submit" element={<Submit />} />
        </Routes>
      </main>

      {/* 🌐 Footer */}
      <footer style={{ marginTop: '40px', textAlign: 'center', fontSize: '14px' }}>
        <hr />
        <p>
          ☠️ View the <strong>FUGA Token</strong>:
          {" "}
          <a href="https://basescan.org/token/0xc0eB2B5773d05c667018fe005910f407B20D530f" target="_blank" rel="noopener noreferrer">
            BaseScan
          </a>{" "}
          | Contract:
          {" "}
          <a href="https://basescan.org/address/0xc0eB2B5773d05c667018fe005910f407B20D530f" target="_blank" rel="noopener noreferrer">
            0xc0eB...530f
          </a>
        </p>
        <p>
          🧾 Token Symbol: <code>FUGA</code> | Standard: <code>ERC-721 Soulbound</code>
        </p>
      </footer>
    </Router>
  )
}

export default App
