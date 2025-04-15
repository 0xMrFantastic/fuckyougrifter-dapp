import React, { useState } from 'react'

const Mint = () => {
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState('')

  const handleMint = () => {
    // This is where contract logic will go
    setStatus(`Simulated mint to: ${address}`)
  }

  return (
    <div>
      <h2>Mint a FuckYouGrifter Token</h2>
      <p>Enter the wallet address of the grifter to mint the soulbound token:</p>
      <input 
        type="text" 
        placeholder="0x..." 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
        style={{ width: '100%', padding: '8px', marginTop: '8px' }}
      />
      <button onClick={handleMint} style={{ marginTop: '12px' }}>
        🔨 Mint Token
      </button>
      {status && <p style={{ marginTop: '10px' }}>{status}</p>}
    </div>
  )
}

export default Mint