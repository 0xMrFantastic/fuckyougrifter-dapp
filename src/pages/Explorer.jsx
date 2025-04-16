import React, { useEffect, useState } from 'react'

const CONTRACT_ADDRESS = '0xc0eB2B5773d05c667018fe005910f407B20D530f'
const API_KEY = 'TV44EWPVUDHKV5ZKBR4XEJVNJQM6TT5KRD'

const Explorer = () => {
  const [wallets, setWallets] = useState([])
  const [labels, setLabels] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const txRes = await fetch(`https://api.basescan.org/api?module=account&action=tokennfttx&contractaddress=${CONTRACT_ADDRESS}&page=1&offset=1000&sort=asc&apikey=${API_KEY}`)
        const txData = await txRes.json()

        const labelRes = await fetch('/data/grifter-submissions.json')
        const labelData = await labelRes.json()

        const labelMap = {}
        labelData.forEach(entry => {
          labelMap[entry.wallet.toLowerCase()] = entry.label
        })

        const mints = txData.result.filter(tx => tx.from === '0x0000000000000000000000000000000000000000')
        const uniqueWallets = Array.from(new Set(mints.map(tx => tx.to.toLowerCase())))

        setWallets(uniqueWallets)
        setLabels(labelMap)
      } catch (err) {
        console.error('Error loading explorer data:', err)
        setWallets([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h2>Grifter Token Explorer</h2>

      {loading && <p>Loading tagged wallets...</p>}

      {!loading && wallets.length === 0 && <p>No wallets tagged yet.</p>}

      {!loading && wallets.length > 0 && (
        <ul>
          {wallets.map((address, index) => {
            const label = labels[address.toLowerCase()]
            return (
              <li key={index}>
                <a href={`https://basescan.org/address/${address}`} target="_blank" rel="noopener noreferrer">
                  {label ? `${label} (${address.slice(0, 6)}...${address.slice(-4)})` : address}
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Explorer
