"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SolanaGetAccountInfo() {
    const [address, setAddress] = useState('');
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try{
            const response = await fetch(`/api/solana/getAccountInfo?address=${address}`)
            const data = await response.json();
            if(response.ok){
                setResult(data)
            } else {
                throw new Error(data.error || 'Failed to Fetch Account Info');
            }
        } catch(err){
            setError(err instanceof Error ? err.message : 'An unexpected error occured.')
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Get Account Info</CardTitle>
                <CardDescription>Retrieve information about a solana account</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Enter Solana Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Get Info'}
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