import React, { useState } from 'react'
import useWallet from '../hooks/useWallet'
import { ethers } from 'ethers'

const Submit = () => {
  const { address, connect } = useWallet()
  const [grifterAddress, setGrifterAddress] = useState('')
  const [label, setLabel] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(null)

    if (!address) {
      setStatus('⚠️ Please connect your wallet first.')
      return
    }

    const cleanAddr = grifterAddress.trim()

    if (!ethers.isAddress(cleanAddr)) {
      setStatus('⚠️ Invalid Ethereum/BASE wallet address.')
      return
    }

    if (!label.trim()) {
      setStatus('⚠️ Label is required.')
      return
    }

    // 🚀 MVP: Log the input – replace this with integration later
    console.log('💾 Grifter submission received:', {
      submittedBy: address,
      grifterAddress: cleanAddr,
      label,
      notes,
      timestamp: new Date().toISOString()
    })

    setStatus('✅ Grifter submitted successfully!')

    // Reset form fields
    setGrifterAddress('')
    setLabel('')
    setNotes('')
  }

  return (
    <div>
      <h2>Submit a Grifter</h2>

      {!address ? (
        <button onClick={connect}>🦊 Connect Wallet to Submit</button>
      ) : (
        <p>✅ Connected as: {address}</p>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginTop: '12px', maxWidth: '600px' }}>
        <input
          type="text"
          placeholder="0x Grifter Wallet Address"
          value={grifterAddress}
          onChange={(e) => setGrifterAddress(e.target.value)}
          required
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Label (e.g. RugPull Discord Mod)"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        <textarea
          placeholder="Evidence, links, or notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          style={{ padding: '8px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', fontWeight: 'bold' }}>📮 Submit Grifter</button>
      </form>

      {status && <p style={{ marginTop: '16px' }}>{status}</p>}

      <p style={{ fontSize: '12px', marginTop: '40px' }}>
        🧾 Submissions are reviewed manually before FUGA tokens are issued.
        Your wallet is recorded for transparency.
      </p>
    </div>
  )
}

export default Submit
