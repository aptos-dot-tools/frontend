"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Wallet, ArrowRight, CheckCircle } from "lucide-react"

export default function BatchCollectionPage() {
  const [collectionProgress, setCollectionProgress] = useState(0)
  const [isCollecting, setIsCollecting] = useState(false)

  const mockWallets = [
    { address: "0x1234...5678", balance: "12.34 APT", selected: true },
    { address: "0xabcd...efgh", balance: "8.92 APT", selected: true },
    { address: "0x9876...4321", balance: "15.67 APT", selected: false },
    { address: "0xfedc...8765", balance: "3.21 APT", selected: true },
  ]

  const startCollection = () => {
    setIsCollecting(true)
    setCollectionProgress(0)

    const interval = setInterval(() => {
      setCollectionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsCollecting(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col">
        {/* <Header /> */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Batch Collection</h1>
              <p className="text-muted-foreground">
                One-click gather funds, quick to main account, saving time & cost!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Collection Setup</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Main Collection Address</Label>
                      <Input placeholder="Enter the main wallet address to collect funds" />
                    </div>

                    <div>
                      <Label>Minimum Balance Threshold</Label>
                      <Input placeholder="0.01 APT" />
                      <p className="text-sm text-muted-foreground mt-1">
                        Only collect from wallets with balance above this threshold
                      </p>
                    </div>

                    <div>
                      <Label>Reserve Amount</Label>
                      <Input placeholder="0.001 APT" />
                      <p className="text-sm text-muted-foreground mt-1">
                        Amount to keep in each wallet for future transactions
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Source Wallets</CardTitle>
                      <Badge variant="secondary">{mockWallets.filter((w) => w.selected).length} selected</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockWallets.map((wallet, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <input type="checkbox" checked={wallet.selected} className="w-4 h-4 text-orange-500" />
                            <Wallet className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <div className="font-mono text-sm">{wallet.address}</div>
                              <div className="text-sm text-muted-foreground">{wallet.balance}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            {wallet.selected && <CheckCircle className="w-4 h-4 text-green-500" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {isCollecting && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Collection Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Progress value={collectionProgress} className="h-3" />
                        <div className="text-center text-sm text-muted-foreground">{collectionProgress}% Complete</div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg"
                  size="lg"
                  onClick={startCollection}
                  disabled={isCollecting}
                >
                  {isCollecting ? "Collecting..." : "Start Batch Collection"}
                </Button>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Collection Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Wallets:</span>
                      <span className="font-medium">{mockWallets.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Selected:</span>
                      <span className="font-medium">{mockWallets.filter((w) => w.selected).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Balance:</span>
                      <span className="font-medium">40.14 APT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Estimated Collection:</span>
                      <span className="font-medium text-green-600">39.11 APT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Network Fees:</span>
                      <span className="font-medium">~0.003 APT</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Collection History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Last Collection</span>
                          <Badge variant="default" className="bg-green-500">
                            Success
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">Collected 25.67 APT from 8 wallets</div>
                        <div className="text-xs text-muted-foreground">2 hours ago</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>• Keep a small reserve in each wallet for future transactions</p>
                    <p>• Collection works best during low network congestion</p>
                    <p>• Always verify the main collection address</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
