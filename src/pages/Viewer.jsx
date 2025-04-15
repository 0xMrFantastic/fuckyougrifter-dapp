import React, { useState } from 'react'

const Viewer = () => {
  const [address, setAddress] = useState('')
  const [hasToken, setHasToken] = useState(null)

  const checkWallet = () => {
    // Placeholder for future contract call
    if (address.toLowerCase().includes('bad')) {
      setHasToken(true)
    } else {
      setHasToken(false)
    }
  }

  return (
    <div>
      <h2>Wallet Viewer</h2>
      <p>Check if a wallet has received the FuckYouGrifter token:</p>
      <input
        type="text"
        placeholder="0x..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: '100%', padding: '8px', marginTop: '8px' }}
      />
      <button onClick={checkWallet} style={{ marginTop: '12px' }}>
        🔍 Check
      </button>
      {hasToken !== null && (
        <p style={{ marginTop: '10px' }}>
          {hasToken
            ? '🚨 Grifter Detected! This wallet has the token.'
            : '✅ No token found for this wallet.'}
        </p>
      )}
    </div>
  )
}

export default Viewer