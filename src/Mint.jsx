import React, { useState } from 'react'
import { getContract } from '../utils/contract'

const Mint = () => {
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleMint = async () => {
    try {
      setLoading(true)
      setStatus('Waiting for MetaMask...')

      // Ensure wallet is connected
      if (!window.ethereum) {
        setStatus('🦊 Please install MetaMask!')
        setLoading(false)
        return
      }

      await window.ethereum.request({ method: 'eth_requestAccounts' })

      const contract = await getContract()
      const tx = await contract.mint(address)
      setStatus('⛓️ Transaction submitted... waiting for confirmation...')

      await tx.wait()
      setStatus(`✅ Token minted to ${address}`)
    } catch (err) {
      setStatus(`❌ Error: ${err.message}`)
    }
    setLoading(false)
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
      <button onClick={handleMint} style={{ marginTop: '12px' }} disabled={loading}>
        🔨 {loading ? 'Minting...' : 'Mint Token'}
      </button>
      {status && <p style={{ marginTop: '10px' }}>{status}</p>}
    </div>
  )
}

export default Mint