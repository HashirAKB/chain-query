// app/api/solana/getTransaction/route.ts
import { NextResponse } from 'next/server'
import { Connection } from '@solana/web3.js'

const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com')

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const signature = searchParams.get('signature')

  if (!signature) {
    return NextResponse.json({ error: 'Transaction signature is required' }, { status: 400 })
  }

  try {
    const transaction = await connection.getTransaction(signature)
    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 })
    }
    return NextResponse.json(transaction)
  } catch (error) {
    console.error('Error fetching transaction:', error)
    return NextResponse.json({ error: 'Failed to fetch transaction' }, { status: 500 })
  }
}