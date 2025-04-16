import { useState, useEffect } from 'react'

const useWallet = () => {
  const [address, setAddress] = useState(null)

  const connect = async () => {
    try {
      if (!window.ethereum) {
        alert("🦊 Please install MetaMask to continue")
        return
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      if (accounts?.length > 0) {
        setAddress(accounts[0])
      } else {
        alert("⚠️ MetaMask returned no accounts.")
      }
    } catch (err) {
      console.error("MetaMask connect error:", err)
      alert("❌ Error connecting wallet. See console.")
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
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
