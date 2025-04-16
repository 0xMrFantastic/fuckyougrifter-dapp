import { useState, useEffect } from 'react'

const useWallet = () => {
  const [address, setAddress] = useState(null)

  const connect = async () => {
    if (!window.ethereum) {
      alert("🦊 Please install MetaMask to use this app.")
      return
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      })
      setAddress(accounts[0])
    } catch (error) {
      console.error("MetaMask connection error:", error)
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
