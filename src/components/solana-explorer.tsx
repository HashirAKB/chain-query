// components/solana-explorer.tsx
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SolanaExplorer() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Get Account Info</CardTitle>
          <CardDescription>Retrieve information about a Solana account</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add input and button here */}
        </CardContent>
      </Card>
      {/* Add more cards for other Solana RPC calls */}
    </div>
  )
}