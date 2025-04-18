import React, { useEffect, useState } from 'react'

const CONTRACT_ADDRESS = '0xc0eB2B5773d05c667018fe005910f407B20D530f'
const API_KEY = 'TV44EWPVUDHKV5ZKBR4XEJVNJQM6TT5KRD'

const Explorer = () => {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMintsAndLabels = async () => {
      try {
        // 1. Fetch mints from BaseScan
        const txRes = await fetch(`https://api.basescan.org/api?module=account&action=tokennfttx&contractaddress=${CONTRACT_ADDRESS}&page=1&offset=1000&sort=asc&apikey=${API_KEY}`)
        const txData = await txRes.json()

        if (txData.status !== '1' || !Array.isArray(txData.result)) {
          throw new Error('BaseScan mint fetch failed')
        }

        const mints = txData.result.filter(tx => tx.from.toLowerCase() === '0x0000000000000000000000000000000000000000')

        // 2. Fetch your label index
        const labelRes = await fetch('/data/grifter-submissions.json')
        const labelData = await labelRes.json()

        // 3. Format label map by tokenId (as string)
        const labelMap = {}
        labelData.forEach(item => {
          labelMap[item.tokenId.toString()] = item
        })

        // 4. Merge mint records + labels
        const labeledResults = mints.map(tx => {
          const tokenId = tx.tokenID
          const match = labelMap[tokenId]
          return {
            tokenId,
            wallet: tx.to,
            label: match?.label || null,
            link: `https://basescan.org/address/${tx.to}`,
            timestamp: new Date(parseInt(tx.timeStamp) * 1000).toISOString().slice(0, 10),
          }
        })

        setRecords(labeledResults)
      } catch (err) {
        console.error('Explorer fetch error:', err)
        setRecords([])
      } finally {
        setLoading(false)
      }
    }

    fetchMintsAndLabels()
  }, [])

  return (
    <div>
      <h2>FUGA Explorer</h2>

      {loading && <p>Loading tagged grifters...</p>}

      {!loading && records.length === 0 && <p>No FUGA tokens minted yet.</p>}

      {!loading && records.length > 0 && (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
  {records.map((entry, index) => (
    <div key={index} style={{ marginBottom: '30px' }}>
      <div>
        <strong>Token #{entry.tokenId}</strong> —{" "}
        <a href={entry.link} target="_blank" rel="noopener noreferrer">
          {entry.wallet}
        </a>
      </div>
      <div>
        {entry.label || 'Unlabeled'} — {entry.timestamp}
      </div>
      <hr style={{ marginTop: '12px' }} />
    </div>
  ))}
</div>
  )
}

export default Explorer
