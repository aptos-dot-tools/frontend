"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Copy, AlertCircle } from "lucide-react"

export default function MultiSenderPage() {
  const [selectedToken, setSelectedToken] = useState("")
  const [recipientList, setRecipientList] = useState("")
  const [addressCount, setAddressCount] = useState(0)

  const handleRecipientChange = (value: string) => {
    setRecipientList(value)
    // Count addresses (simplified)
    const lines = value.split("\n").filter((line) => line.trim())
    setAddressCount(lines.length)
  }

  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Aptos Multisender</h1>
              <p className="text-muted-foreground">
                Aptos chain best airdrop tool, transfer from one address to multiple addresses, support same quantity,
                random quantity and custom quantity transfer, and set the interval time for each transfer, safely and
                efficiently handle large transfers, the more transfers, the lower the cost!
              </p>
            </div>
            <Badge variant="default" className="bg-green-500 hover:bg-green-600">
              Security Reminder, Must Read!
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Progress Steps */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <span className="font-medium">Prepare</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <span className="text-muted-foreground">Execute</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <span className="text-muted-foreground">Complete</span>
                  </div>
                </div>
                <Progress value={33} className="h-2" />
              </CardContent>
            </Card>

            {/* Token Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Select Token
                  <AlertCircle className="w-4 h-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Select or Enter Token Address"
                    value={selectedToken}
                    onChange={(e) => setSelectedToken(e.target.value)}
                    className="w-full"
                  />

                  <Tabs defaultValue="wallet" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger
                        value="wallet"
                        className="bg-orange-500 text-white data-[state=active]:bg-orange-600"
                      >
                        Wallet Operation
                      </TabsTrigger>
                      <TabsTrigger value="private">Private Key Operation</TabsTrigger>
                    </TabsList>
                    <TabsContent value="wallet" className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label>Address</Label>
                          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                            <span className="text-sm font-mono">Au1B5xov1ThnTBtd2UjE8k5qhNfTWo3BlgPSGxVQmdRP</span>
                            <Button variant="ghost" size="sm">
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label>APT Balance</Label>
                          <div className="p-3 bg-muted rounded-lg">
                            <span className="text-sm">0.0000</span>
                          </div>
                        </div>
                        <div>
                          <Label>Balance</Label>
                          <div className="p-3 bg-muted rounded-lg">
                            <span className="text-sm">0.0000</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>

            {/* Recipient List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recipient Address List</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" className="bg-orange-500 text-white hover:bg-orange-600">
                      Import Wallet
                    </Button>
                    <Button variant="outline">Create Wallet</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Input recipient address or recipient address and quantity, for example:</Label>
                    <div className="mt-2 p-3 bg-muted rounded-lg text-sm font-mono">
                      <div>5R16jjMXqRSCSo39F2r6QB7ba83ujEK19AAba76GQ</div>
                      <div>7zHuMHgRuV3BFJeTt5omAsvfkX7UZPwF5DvFL95sgET,0.01</div>
                    </div>
                  </div>

                  <Textarea
                    placeholder="Input recipient address or recipient address and quantity, for example:"
                    className="min-h-[200px] font-mono text-sm"
                    value={recipientList}
                    onChange={(e) => handleRecipientChange(e.target.value)}
                  />

                  <div className="text-sm text-muted-foreground">Address Count: {addressCount}</div>
                </div>
              </CardContent>
            </Card>

            {/* Action Button */}
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg" size="lg">
              Next
            </Button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">User Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Total Address Count:</Label>
                  <div className="text-lg font-semibold">-</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>APT Balance</span>
                    <span>USDC Balance</span>
                    <span>Token Balance</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>-</span>
                    <span>-</span>
                    <span>-</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">Active Account Count:</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between text-sm">
                      <span>APT Balance</span>
                      <span>USDC Balance</span>
                      <span>Token Balance</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>-</span>
                      <span>-</span>
                      <span>-</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Batch Transaction Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>GAS Selection</Label>
                  <div className="mt-2 p-2 border rounded-lg">
                    <div className="text-sm">🔄 Random</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>From</Label>
                  <div className="flex items-center gap-2 p-2 border rounded-lg">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">
                      A
                    </div>
                    <span className="text-sm">Aptos · Buff1...H2</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>To</Label>
                  <div className="flex items-center gap-2 p-2 border rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                      U
                    </div>
                    <span className="text-sm">USD Coin · E7F9BL...Dxv</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <span>✓</span>
                    <span>High Liquidity Pool</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction Log */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Transaction Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">No Records</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
