import { useState, useEffect } from 'react'

const useWallet = () => {
  const [address, setAddress] = useState(null)

  const connect = async () => {
    try {
      if (!window.ethereum) {
        alert("🦊 MetaMask not detected. Use the MetaMask browser or install the extension.")
        return
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      if (accounts?.length > 0) {
        setAddress(accounts[0])
      }
    } catch (error) {
      console.error("❌ Wallet connection error:", error)
    }
  }

  const disconnect = () => {
    setAddress(null)
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then(accounts => {
          if (accounts?.[0]) setAddress(accounts[0])
        })

      window.ethereum.on('accountsChanged', (accounts) => {
        setAddress(accounts?.[0] || null)
      })
    }
  }, [])

  return { address, connect, disconnect }
}

export default useWallet
