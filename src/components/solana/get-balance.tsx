"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SolanaGetBalance() {
  const [address, setAddress] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/solana/getBalance?address=${address}`)
      const data = await response.json()
      if (response.ok) {
        setResult(data.balance)
      } else {
        throw new Error(data.error || 'Failed to fetch balance')
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
        <CardTitle>Get Balance</CardTitle>
        <CardDescription>Retrieve the balance of a Solana account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Enter Solana address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Get Balance'}
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
            <h3 className="font-semibold">Balance:</h3>
            <p>{result} SOL</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}