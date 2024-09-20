// app/page.tsx
"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SolanaExplorer } from "@/components/solana-explorer"
import { EthereumExplorer } from "@/components/ethereum-explorer"
import { RPCPlayground } from "@/components/rpc-playground"

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blockchain RPC Explorer</h1>
      <Tabs defaultValue="solana" className="w-full">
        <TabsList>
          <TabsTrigger value="solana">Solana</TabsTrigger>
          <TabsTrigger value="ethereum">Ethereum</TabsTrigger>
          <TabsTrigger value="playground">RPC Playground</TabsTrigger>
        </TabsList>
        <TabsContent value="solana">
          <SolanaExplorer />
        </TabsContent>
        <TabsContent value="ethereum">
          <EthereumExplorer />
        </TabsContent>
        <TabsContent value="playground">
          <RPCPlayground />
        </TabsContent>
      </Tabs>
    </div>
  )
}