// app/api/solana/getBlock/route.ts
import { NextResponse } from 'next/server'
import { Connection } from '@solana/web3.js'

const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com')

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slot = searchParams.get('slot')

  if (!slot) {
    return NextResponse.json({ error: 'Block slot number is required' }, { status: 400 })
  }

  try {
    const block = await connection.getBlock(parseInt(slot))
    if (!block) {
      return NextResponse.json({ error: 'Block not found' }, { status: 404 })
    }
    return NextResponse.json(block)
  } catch (error) {
    console.error('Error fetching block:', error)
    return NextResponse.json({ error: 'Failed to fetch block' }, { status: 500 })
  }
}