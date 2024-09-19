// components/ethereum-explorer.tsx
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function EthereumExplorer() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Get Balance</CardTitle>
          <CardDescription>Retrieve the balance of an Ethereum address</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add input and button here */}
        </CardContent>
      </Card>
      {/* Add more cards for other Ethereum RPC calls */}
    </div>
  )
}