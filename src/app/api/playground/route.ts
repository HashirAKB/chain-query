// app/api/playground/route.ts
import { NextResponse } from 'next/server'
import { Connection } from '@solana/web3.js'
import { ethers } from 'ethers'

const solanaConnection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com')
const ethereumProvider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL || 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID')

export async function POST(request: Request) {
  const body = await request.json()
  const { blockchain, method, params } = body

  if (!blockchain || !method) {
    return NextResponse.json({ error: 'Blockchain and method are required' }, { status: 400 })
  }

  try {
    let result

    if (blockchain === 'solana') {
      // @ts-ignore: Dynamically calling methods on Connection
      result = await solanaConnection[method](...params)
    } else if (blockchain === 'ethereum') {
      result = await ethereumProvider.send(method, params)
    } else {
      throw new Error('Invalid blockchain specified')
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error executing RPC call:', error)
    return NextResponse.json({ error: 'Failed to execute RPC call' }, { status: 500 })
  }
}