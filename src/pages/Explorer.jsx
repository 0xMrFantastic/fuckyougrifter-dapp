import React, { useEffect, useState } from 'react'

const CONTRACT_ADDRESS = '0xc0eB2B5773d05c667018fe005910f407B20D530f'
const API_KEY = 'TV44EWPVUDHKV5ZKBR4XEJVNJQM6TT5KRD'

const Explorer = () => {
  const [wallets, setWallets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMintedWallets = async () => {
      try {
        const response = await fetch(`https://api.basescan.org/api?module=account&action=tokennfttx&contractaddress=${CONTRACT_ADDRESS}&page=1&offset=1000&sort=asc&apikey=${API_KEY}`)
        const data = await response.json()

        if (data.status !== '1') {
          throw new Error('Failed to fetch data from BaseScan')
        }

        const mints = data.result.filter(tx => tx.from === '0x0000000000000000000000000000000000000000')
        const uniqueWallets = Array.from(new Set(mints.map(tx => tx.to.toLowerCase())))

        setWallets(uniqueWallets)
      } catch (err) {
        console.error('Error loading explorer data:', err)
        setWallets([])
      } finally {
        setLoading(false)
      }
    }

    fetchMintedWallets()
  }, [])

  return (
    <div>
      <h2>Grifter Token Explorer</h2>

      {loading && <p>Loading tagged wallets...</p>}

      {!loading && wallets.length === 0 && <p>No wallets tagged yet.</p>}

      {!loading && wallets.length > 0 && (
        <ul>
          {wallets.map((address, index) => (
            <li key={index}>
              <a href={`https://basescan.org/address/${address}`} target="_blank" rel="noopener noreferrer">
                {address}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Explorer
