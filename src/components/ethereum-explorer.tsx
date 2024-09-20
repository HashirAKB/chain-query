// components/ethereum-explorer.tsx
"use client"

import { EthereumGetBalance } from './ethereum/get-balance'
import { EthereumGetBlockByNumber } from './ethereum/get-block-by-number'
import { EthereumGetTransactionByHash } from "./ethereum/get-transaction-by-hash"
import { EthereumGetGasPrice } from "./ethereum/get-gas-price"

export function EthereumExplorer() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <EthereumGetBalance />
      <EthereumGetBlockByNumber />
      <EthereumGetTransactionByHash/>
      <EthereumGetGasPrice />
    </div>
  )
}