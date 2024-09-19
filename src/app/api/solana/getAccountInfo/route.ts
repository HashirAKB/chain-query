// app/api/solana/getAccountInfo/route.ts
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
    const accountInfo = await connection.getAccountInfo(publicKey)

    if (!accountInfo) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 })
    }

    return NextResponse.json({
      lamports: accountInfo.lamports,
      owner: accountInfo.owner.toBase58(),
      executable: accountInfo.executable,
      rentEpoch: accountInfo.rentEpoch,
    })
  } catch (error) {
    console.error('Error fetching account info:', error)
    return NextResponse.json({ error: 'Failed to fetch account info' }, { status: 500 })
  }
}