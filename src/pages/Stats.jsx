import React, { useEffect, useState } from 'react'

const CONTRACT_ADDRESS = '0xc0eB2B5773d05c667018fe005910f407B20D530f'
const API_KEY = 'TV44EWPVUDHKV5ZKBR4XEJVNJQM6TT5KRD'
const API_URL = `https://api.basescan.org/api?module=account&action=tokennfttx&contractaddress=${CONTRACT_ADDRESS}&page=1&offset=1000&sort=asc&apikey=${API_KEY}`

const Stats = () => {
  const [minted, setMinted] = useState(null)
  const [uniqueHolders, setUniqueHolders] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(API_URL)
        const data = await res.json()

        if (data.status !== '1') throw new Error('Failed to fetch from BaseScan')

        const transactions = data.result

        // Count mints by checking for transfers from address(0)
        const mintTxs = transactions.filter((tx) => tx.from === '0x0000000000000000000000000000000000000000')
        const holders = new Set(mintTxs.map(tx => tx.to.toLowerCase()))

        setMinted(mintTxs.length)
        setUniqueHolders(holders.size)
      } catch (err) {
        console.error('Error fetching stats:', err)
        setMinted('N/A')
        setUniqueHolders('N/A')
      }
    }

    fetchStats()
  }, [])

  return (
    <div>
      <h2>Statistics</h2>
      <ul>
        <li><strong>Total Soulbound Tokens Minted:</strong> {minted ?? 'Loading...'}</li>
        <li><strong>Total Unique Tagged Wallets:</strong> {uniqueHolders ?? 'Loading...'}</li>
        <li><strong>Network:</strong> Base Mainnet</li>
      </ul>
    </div>
  )
}

export default Stats
