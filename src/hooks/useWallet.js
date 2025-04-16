import { useState, useEffect } from 'react'

const useWallet = () => {
  const [address, setAddress] = useState(null)

  const connect = async () => {
    try {
      if (typeof window === 'undefined' || !window.ethereum) {
        alert("🦊 MetaMask not detected.\n\nOn iPhone, open this site using the MetaMask *in-app browser*.")
        return
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

      if (accounts?.length > 0) {
        setAddress(accounts[0])
      } else {
        alert("⚠️ No accounts returned from MetaMask.")
      }
    } catch (error) {
      console.error("❌ Wallet connect error:", error)
      alert("❌ Failed to connect MetaMask. Check console for details.")
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts) => {
          if (accounts[0]) setAddress(accounts[0])
        })

      window.ethereum.on('accountsChanged', (accounts) => {
        setAddress(accounts[0] || null)
      })
    }
  }, [])

  return { address, connect }
}

export default useWallet
