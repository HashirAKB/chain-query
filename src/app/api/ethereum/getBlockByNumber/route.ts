// app/api/ethereum/getBlockByNumber/route.ts
import { NextResponse } from 'next/server'
import { ethers } from 'ethers'

const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL || 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID')

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const blockNumber = searchParams.get('blockNumber')

  if (!blockNumber) {
    return NextResponse.json({ error: 'Block number is required' }, { status: 400 })
  }

  try {
    const block = await provider.getBlock(parseInt(blockNumber))
    if (!block) {
      return NextResponse.json({ error: 'Block not found' }, { status: 404 })
    }
    return NextResponse.json(block)
  } catch (error) {
    console.error('Error fetching block:', error)
    return NextResponse.json({ error: 'Failed to fetch block' }, { status: 500 })
  }
}