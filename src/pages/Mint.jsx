import React, { useState } from 'react'
import useWallet from '../hooks/useWallet'
import { ethers } from 'ethers'

const CONTRACT_ADDRESS = '0xc0eB2B5773d05c667018fe005910f407B20D530f'
const CONTRACT_ABI = [
  {
    "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const Mint = () => {
  const [targetAddress, setTargetAddress] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const { address, connect } = useWallet()
  const ownerAddress = '0xe0b0487Bcb7D0b73edCeb90794056DC891AcBc69'
  const isOwner = address?.toLowerCase() === ownerAddress.toLowerCase()

  const handleMint = async () => {
    if (!window.ethereum) {
      setStatus("❌ Please install MetaMask")
      return
    }

    if (!targetAddress || !ethers.isAddress(targetAddress)) {
      setStatus("❌ Invalid target address")
      return
    }

    try {
      setLoading(true)
      setStatus("🔄 Connecting to contract...")

      await window.ethereum.request({ method: "eth_requestAccounts" })
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
      const tx = await contract.mint(targetAddress)
      setStatus("⛓️ Mint transaction submitted. Waiting for confirmation...")

      await tx.wait()
      setStatus(`✅ Successfully minted to ${targetAddress}`)
      setTargetAddress('')
    } catch (err) {
      console.error(err)
      setStatus(`❌ Mint failed: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Mint a FuckYouGrifter Token</h2>

      {!address ? (
        <button onClick={connect}>🦊 Connect Wallet</button>
      ) : (
        <>
          <p>Connected as: <strong>{address.slice(0, 6)}...{address.slice(-4)}</strong></p>
          {!isOwner ? (
            <p style={{ color: 'red' }}>🚫 Only the contract owner can mint.</p>
          ) : (
            <>
              <input
                type="text"
                placeholder="Wallet to tag (0x...)"
                value={targetAddress}
                onChange={(e) => setTargetAddress(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '8px' }}
              />
              <button onClick={handleMint} disabled={loading} style={{ marginTop: '10px' }}>
                🔨 {loading ? 'Minting...' : 'Mint Token'}
              </button>
            </>
          )}
        </>
      )}

      {status && <p style={{ marginTop: '12px' }}>{status}</p>}
    </div>
  )
}

export default Mint
