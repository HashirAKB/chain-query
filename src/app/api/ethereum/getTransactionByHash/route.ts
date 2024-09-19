// app/api/ethereum/getTransactionByHash/route.ts
import { NextResponse } from 'next/server'
import { ethers } from 'ethers'

const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL || 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID')

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const txHash = searchParams.get('txHash')

  if (!txHash) {
    return NextResponse.json({ error: 'Transaction hash is required' }, { status: 400 })
  }

  try {
    const transaction = await provider.getTransaction(txHash)
    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 })
    }
    return NextResponse.json(transaction)
  } catch (error) {
    console.error('Error fetching transaction:', error)
    return NextResponse.json({ error: 'Failed to fetch transaction' }, { status: 500 })
  }
}