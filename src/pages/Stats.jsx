import React from 'react'

const Stats = () => {
  // Placeholder stat values
  const totalMinted = 69
  const totalGrifters = 69

  return (
    <div>
      <h2>Statistics</h2>
      <ul>
        <li>Total soulbound tokens minted: {totalMinted}</li>
        <li>Total wallets tagged as grifters: {totalGrifters}</li>
        <li>Network: Base Mainnet</li>
      </ul>
    </div>
  )
}

export default Stats