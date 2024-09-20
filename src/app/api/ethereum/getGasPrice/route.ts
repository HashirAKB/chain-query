// app/api/ethereum/getGasPrice/route.ts
import { NextResponse } from 'next/server'
import { ethers } from 'ethers'

const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL || 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID')

export async function GET() {
  try {
    const feeData = await provider.getFeeData()
    if (feeData.gasPrice === null) {
      return NextResponse.json({ error: 'Gas price data is not available' }, { status: 404 })
    }
    return NextResponse.json({ gasPrice: ethers.formatUnits(feeData.gasPrice, 'gwei') })
  } catch (error) {
    console.error('Error fetching gas price:', error)
    return NextResponse.json({ error: 'Failed to fetch gas price' }, { status: 500 })
  }
}