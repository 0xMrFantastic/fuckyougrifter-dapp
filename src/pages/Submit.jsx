import React, { useState } from 'react'
import useWallet from '../hooks/useWallet'
import { ethers } from 'ethers'
import { db } from '../utils/firebase-config'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const Submit = () => {
  const { address, connect } = useWallet()
  const [grifterAddress, setGrifterAddress] = useState('')
  const [label, setLabel] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(null)

    if (!address) {
      setStatus('⚠️ Please connect your wallet.')
      return
    }

    const cleanAddr = grifterAddress.trim()

    if (!ethers.isAddress(cleanAddr)) {
      setStatus('❌ Invalid wallet address format.')
      return
    }

    if (!label.trim()) {
      setStatus('⚠️ Label is required.')
      return
    }

    try {
      const docRef = await addDoc(collection(db, 'submissions'), {
        wallet: cleanAddr,
        label,
        notes,
        submittedBy: address,
        timestamp: Timestamp.now()
      })

      console.log("✅ Firestore document added with ID:", docRef.id)

      setStatus('✅ Grifter submitted 💀')
      setGrifterAddress('')
      setLabel('')
      setNotes('')
    } catch (err) {
      console.error("🔥 Submission failed:", err)
      setStatus('❌ Submission failed. Check console.')
    }
  }

  return (
    <div>
      <h2>Submit a Grifter</h2>

      {!address ? (
        <button onClick={connect}>🦊 Connect Wallet</button>
      ) : (
        <p>✅ Connected as: {address}</p>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px' }}>
        <input
          type="text"
          placeholder="0x Grifter Wallet Address"
          value={grifterAddress}
          onChange={e => setGrifterAddress(e.target.value)}
          style={{ marginBottom: '10px', padding: '8px' }}
          required
        />
        <input
          type="text"
          placeholder="Why are they grifting? (e.g., RugPull Master)"
          value={label}
          onChange={e => setLabel(e.target.value)}
          style={{ marginBottom: '10px', padding: '8px' }}
          required
        />
        <textarea
          placeholder="Receipts (links, notes, Etherscan txs)..."
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={5}
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px' }}>📮 Submit Grifter</button>
      </form>

      {status && <p style={{ marginTop: '16px' }}>{status}</p>}

      <p style={{ fontSize: '12px', marginTop: '40px' }}>
        🧾 Submissions are stored in Firebase and reviewed manually before token minting.
      </p>
    </div>
  )
}

export default Submit
