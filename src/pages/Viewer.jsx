import React, { useState } from 'react'
import { ethers } from 'ethers'

const CONTRACT_ADDRESS = '0xc0eB2B5773d05c667018fe005910f407B20D530f'
const ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" }
    ],
    "name": "balanceOf",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const Viewer = () => {
  const [inputAddress, setInputAddress] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const checkToken = async () => {
    setLoading(true)
    setStatus(null)

    try {
      if (!ethers.isAddress(inputAddress)) {
        setStatus('❌ Invalid wallet address')
        setLoading(false)
        return
      }

      const provider = new ethers.JsonRpcProvider("https://mainnet.base.org")
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)

      const balance = await contract.balanceOf(inputAddress)

      if (balance > 0) {
        setStatus(`✅ Tagged! This wallet holds ${balance} token(s).`)
      } else {
        setStatus("✅ Wallet has no FuckYouGrifter token.")
      }
    } catch (err) {
      console.error("Viewer check failed:", err)
      setStatus("⚠️ Error fetching token data")
    }

    setLoading(false)
  }

  return (
    <div>
      <h2>Check Grifter Token Status</h2>
      <p>Enter a wallet address to see if it’s been tagged:</p>

      <input
        type="text"
        placeholder="0x..."
        value={inputAddress}
        onChange={(e) => setInputAddress(e.target.value)}
        style={{ width: '100%', padding: '8px', marginTop: '8px' }}
      />

      <button onClick={checkToken} disabled={loading} style={{ marginTop: '12px' }}>
        🔍 {loading ? 'Checking...' : 'Check Wallet'}
      </button>

      {status && <p style={{ marginTop: '12px' }}>{status}</p>}
    </div>
  )
}

export default Viewer
