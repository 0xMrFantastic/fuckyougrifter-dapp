import { ethers } from 'ethers'

const CONTRACT_ADDRESS = "0x869a41ec146d869cE22C97FD36f97Fe7aF48AA3B"

const CONTRACT_ABI = [
  {
    "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export const getContract = () => {
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = provider.getSigner()
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
}