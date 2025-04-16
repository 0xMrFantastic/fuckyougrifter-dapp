import React, { useState } from 'react'
import useWallet from '../hooks/useWallet'

const Submit = () => {
  const { address, connect } = useWallet()
  const [grifterAddress, setGrifterAddress] = useState('')
  const [label, setLabel] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!address) {
      setStatus('⚠️ Connect your wallet first.')
      return
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(grifterAddress)) {
      setStatus('⚠️ Invalid wallet address.')
      return
    }

    if (!label.trim()) {
      setStatus('⚠️ Label (reason) is required.')
      return
    }

    // 🚀 MVP: Log grifter submission to console
    console.log('Grifter Submission:', {
      submittedBy: address,
      wallet: grifterAddress,
      label,
      notes
    })

    setStatus('✅ Grifter submitted successfully!')
    setGrifterAddress('')
    setLabel('')
    setNotes('')
  }

  return (
    <div>
      <h2>Submit a Grifter for Tagging</h2>

      {!address ? (
        <button onClick={connect}>Connect Wallet to Submit</button>
      ) : (
        <p>✅ Connected as: {address}</p>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginTop: '12px' }}>
        <input
          type="text"
          placeholder="Ethereum/BASE wallet address"
          value={grifterAddress}
          onChange={(e) => setGrifterAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Label — e.g. 'RugPull influencer'"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
        />
        <textarea
          placeholder="Evidence, links, or notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
        />
        <button type="submit" style={{ marginTop: '10px' }}>📮 Submit Grifter</button>
      </form>

      {status && <p style={{ marginTop: '10px' }}>{status}</p>}

      <p style={{ fontSize: '12px', marginTop: '40px' }}>
        🔒 Your submission is private. We'll review it for consideration in future FuckYouGrifter mints. No token will be issued automatically.
      </p>
    </div>
  )
}

export default Submit
