"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ArrowUpDown, Plus, Trash2 } from "lucide-react"

export default function MultiSwapPage() {
  const [accounts, setAccounts] = useState([
    { id: 1, address: "0x1234...5678", balance: "12.34 APT" },
    { id: 2, address: "0xabcd...efgh", balance: "8.92 APT" },
  ])

  return (
    <div className="flex min-h-screen bg-background">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col">
        {/* <Header /> */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Multi Swap</h1>
              <p className="text-muted-foreground">Manage multiple accounts freely, execute trades efficiently!</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Swap Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>From Token</Label>
                        <div className="flex items-center gap-2 p-3 border rounded-lg">
                          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            A
                          </div>
                          <div>
                            <div className="font-medium">APT</div>
                            <div className="text-sm text-muted-foreground">Aptos</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label>To Token</Label>
                        <div className="flex items-center gap-2 p-3 border rounded-lg">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            U
                          </div>
                          <div>
                            <div className="font-medium">USDC</div>
                            <div className="text-sm text-muted-foreground">USD Coin</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button variant="outline" size="sm">
                        <ArrowUpDown className="w-4 h-4" />
                      </Button>
                    </div>

                    <div>
                      <Label>Amount per Account</Label>
                      <Input placeholder="Enter amount to swap" />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Auto Execute</Label>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Account Management</CardTitle>
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Account
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {accounts.map((account) => (
                        <div key={account.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white text-sm">
                              {account.id}
                            </div>
                            <div>
                              <div className="font-mono text-sm">{account.address}</div>
                              <div className="text-sm text-muted-foreground">{account.balance}</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg" size="lg">
                  Execute Multi Swap
                </Button>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Swap Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Slippage Tolerance</Label>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          0.1%
                        </Button>
                        <Button variant="outline" size="sm">
                          0.5%
                        </Button>
                        <Button variant="outline" size="sm" className="bg-orange-500 text-white">
                          1.0%
                        </Button>
                        <Button variant="outline" size="sm">
                          3.0%
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label>Transaction Deadline</Label>
                      <Input placeholder="20 minutes" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Accounts:</span>
                      <span className="font-medium">{accounts.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Estimated Gas:</span>
                      <span className="font-medium">~0.002 APT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Success Rate:</span>
                      <span className="font-medium text-green-600">98.5%</span>
                    </div>
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
