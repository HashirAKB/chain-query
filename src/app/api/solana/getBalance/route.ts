// app/api/solana/getBalance/route.ts
import { NextResponse } from 'next/server'
import { Connection, PublicKey } from '@solana/web3.js'

const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com')

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get('address')

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 })
  }

  try {
    const publicKey = new PublicKey(address)
    const balance = await connection.getBalance(publicKey)
    return NextResponse.json({ balance: balance / 1e9 }) // Convert lamports to SOL
  } catch (error) {
    console.error('Error fetching balance:', error)
    return NextResponse.json({ error: 'Failed to fetch balance' }, { status: 500 })
  }
}