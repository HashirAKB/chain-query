// components/solana/get-block.tsx
"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SolanaGetBlock() {
  const [slot, setSlot] = useState('')
  const [result, setResult] = useState<unknown>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/solana/getBlock?slot=${slot}`)
      const data = await response.json()
      if (response.ok) {
        setResult(data)
      } else {
        throw new Error(data.error || 'Failed to fetch block')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get Block</CardTitle>
        <CardDescription>Retrieve information about a Solana block</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Enter block slot number"
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Get Block'}
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