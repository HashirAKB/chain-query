// components/solana-explorer.tsx
"use client"

import { SolanaGetAccountInfo } from './solana/get-account-info'
import { SolanaGetBalance } from './solana/get-balance'
import { SolanaGetTransaction } from './solana/get-transaction'
import { SolanaGetBlock } from './solana/get-block'

export function SolanaExplorer() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <SolanaGetAccountInfo />
      <SolanaGetBalance />
      <SolanaGetTransaction />
      <SolanaGetBlock />
    </div>
  )
}