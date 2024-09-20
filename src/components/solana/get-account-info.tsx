"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SolanaGetAccountInfo() {
    const [address, setAddress] = useState('');
    const [result, setResult] = useState(null);
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

    const formatLamports = (lamports: number) => {
        const sol = lamports / 1000000000; // LAMPORTS_PER_SOL
        return `${sol.toFixed(9)} SOL (${lamports.toLocaleString()} lamports)`;
    };

    const formatRentEpoch = (rentEpoch: number) => {
        return rentEpoch === 18446744073709552000 ? "Max Value (2^64)" : rentEpoch.toString();
    };

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
            <div className="mt-4 space-y-2">
                <h3 className="font-semibold">Account Information:</h3>
                        <div><strong>Address:</strong> {address}</div>
                        <div><strong>Balance:</strong> {formatLamports(result.lamports)}</div>
                        <div><strong>Owner:</strong> {result.owner}</div>
                        <div><strong>Executable:</strong> {result.executable ? 'Yes' : 'No'}</div>
                        <div><strong>Rent Epoch:</strong> {formatRentEpoch(result.rentEpoch)}</div>
                </div>
            )}
            </CardContent>
        </Card>
    )
}