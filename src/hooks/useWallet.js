import { useState, useEffect } from 'react'

const useWallet = () => {
  const [address, setAddress] = useState(null)

  const connect = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask to use this app.")
      return
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      })
      setAddress(accounts[0])
    } catch (err) {
      console.error("MetaMask connection failed", err)
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (acc) => setAddress(acc[0] || null))
    }
  }, [])

  return { address, connect }
}

export default useWallet