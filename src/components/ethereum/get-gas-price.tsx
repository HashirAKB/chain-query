// components/ethereum/get-gas-price.tsx
"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function EthereumGetGasPrice() {
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/ethereum/getGasPrice')
      const data = await response.json()
      if (response.ok) {
        setResult(data.gasPrice)
      } else {
        throw new Error(data.error || 'Failed to fetch gas price')
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
        <CardTitle>Get Gas Price</CardTitle>
        <CardDescription>Retrieve the current gas price on Ethereum</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Get Gas Price'}
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
            <h3 className="font-semibold">Current Gas Price:</h3>
            <p>{result} Gwei</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}