// app/api/ethereum/getBalance/route.ts
import { NextResponse } from 'next/server'
import { ethers } from 'ethers'

const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL || 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID')

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get('address')

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 })
  }

  try {
    const balance = await provider.getBalance(address)
    return NextResponse.json({ balance: ethers.formatEther(balance) })
  } catch (error) {
    console.error('Error fetching balance:', error)
    return NextResponse.json({ error: 'Failed to fetch balance' }, { status: 500 })
  }
}