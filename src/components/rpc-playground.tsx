// components/rpc-playground.tsx
"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function RPCPlayground() {
  const [blockchain, setBlockchain] = useState<'solana' | 'ethereum'>('solana')
  const [method, setMethod] = useState('')
  const [params, setParams] = useState('')
  const [result, setResult] = useState<unknown>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/playground', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blockchain,
          method,
          params: JSON.parse(params),
        }),
      })

      const data = await response.json()
      if (response.ok) {
        setResult(data)
      } else {
        throw new Error(data.error || 'Failed to execute RPC call')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>RPC Playground</CardTitle>
        <CardDescription>Execute custom RPC calls for Solana and Ethereum</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select onValueChange={(value: 'solana' | 'ethereum') => setBlockchain(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select blockchain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solana">Solana</SelectItem>
              <SelectItem value="ethereum">Ethereum</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="RPC method (e.g., getBalance)"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
          <Textarea
            placeholder="Parameters (JSON format, e.g., ['address'])"
            value={params}
            onChange={(e) => setParams(e.target.value)}
            rows={4}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Executing...' : 'Execute RPC Call'}
          </Button>
        </form>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {result && (
          <div className="mt-4">
            <h3 className="font-semibold">Result:</h3>
            <pre className="bg-secondary p-2 rounded-md overflow-x-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}