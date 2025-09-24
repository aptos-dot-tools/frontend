"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, TrendingUp, Wallet, Users } from "lucide-react"

export default function AptStakingPage() {
  const [selectedValidator, setSelectedValidator] = useState("")
  const [stakeAmount, setStakeAmount] = useState("")
  const [activeTab, setActiveTab] = useState("stake")

  const validators = [
    { name: "Aptos Foundation", commission: "0%", apy: "7.2%", address: "0x1234...5678" },
    { name: "Validator Node 1", commission: "5%", apy: "6.8%", address: "0x2345...6789" },
    { name: "Validator Node 2", commission: "3%", apy: "7.0%", address: "0x3456...7890" },
    { name: "Validator Node 3", commission: "4%", apy: "6.9%", address: "0x4567...8901" },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold">APT Staking Manager</h1>
              <p className="text-muted-foreground mt-2">
                Stake APT tokens with validators, manage delegations, and earn rewards efficiently on the Aptos network.
              </p>
            </div>

            {/* Security Notice */}
            <div className="mb-6">
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800 text-sm">
                  Security Reminder: Always verify validator addresses and understand staking risks before proceeding.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Staking Interface */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Staking Operations</CardTitle>
                    <CardDescription>Stake, unstake, or manage your APT delegations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="stake">Stake APT</TabsTrigger>
                        <TabsTrigger value="unstake">Unstake</TabsTrigger>
                        <TabsTrigger value="rewards">Claim Rewards</TabsTrigger>
                      </TabsList>

                      <TabsContent value="stake" className="space-y-4">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="validator">Select Validator</Label>
                            <Select value={selectedValidator} onValueChange={setSelectedValidator}>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a validator to delegate to" />
                              </SelectTrigger>
                              <SelectContent>
                                {validators.map((validator, index) => (
                                  <SelectItem key={index} value={validator.address}>
                                    <div className="flex items-center justify-between w-full">
                                      <span>{validator.name}</span>
                                      <div className="flex gap-2 ml-4">
                                        <Badge variant="secondary">{validator.commission}</Badge>
                                        <Badge variant="outline">{validator.apy} APY</Badge>
                                      </div>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="amount">Stake Amount (APT)</Label>
                            <Input
                              id="amount"
                              type="number"
                              placeholder="Enter amount to stake"
                              value={stakeAmount}
                              onChange={(e) => setStakeAmount(e.target.value)}
                            />
                            <p className="text-sm text-muted-foreground mt-1">
                              Minimum stake: 11 APT (10 APT + 1 APT for fees)
                            </p>
                          </div>

                          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <h4 className="font-medium text-orange-800 mb-2">Staking Information</h4>
                            <ul className="text-sm text-orange-700 space-y-1">
                              <li>• Staking rewards are distributed every epoch (~2 hours)</li>
                              <li>• Unstaking has a 30-day lockup period</li>
                              <li>• Rewards are automatically compounded</li>
                            </ul>
                          </div>

                          <Button className="w-full bg-orange-500 hover:bg-orange-600">Stake APT Tokens</Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="unstake" className="space-y-4">
                        <div className="space-y-4">
                          <div>
                            <Label>Current Stakes</Label>
                            <div className="space-y-2 mt-2">
                              <div className="p-3 border rounded-lg">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="font-medium">Aptos Foundation</p>
                                    <p className="text-sm text-muted-foreground">100 APT staked</p>
                                  </div>
                                  <Button variant="outline" size="sm">
                                    Unstake
                                  </Button>
                                </div>
                              </div>
                              <div className="p-3 border rounded-lg">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="font-medium">Validator Node 1</p>
                                    <p className="text-sm text-muted-foreground">50 APT staked</p>
                                  </div>
                                  <Button variant="outline" size="sm">
                                    Unstake
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <h4 className="font-medium text-yellow-800 mb-2">Unstaking Notice</h4>
                            <p className="text-sm text-yellow-700">
                              Unstaked tokens will be locked for 30 days before becoming available for withdrawal.
                            </p>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="rewards" className="space-y-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Card>
                              <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="w-5 h-5 text-green-500" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Pending Rewards</p>
                                    <p className="text-2xl font-bold">2.45 APT</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                  <Wallet className="w-5 h-5 text-blue-500" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Total Earned</p>
                                    <p className="text-2xl font-bold">15.67 APT</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          <Button className="w-full bg-green-500 hover:bg-green-600">Claim All Rewards</Button>

                          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 className="font-medium text-blue-800 mb-2">Reward History</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Epoch 1234</span>
                                <span className="text-green-600">+0.12 APT</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Epoch 1233</span>
                                <span className="text-green-600">+0.11 APT</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Epoch 1232</span>
                                <span className="text-green-600">+0.13 APT</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                {/* Validator Rankings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Top Validators
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {validators.map((validator, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-sm">{validator.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              #{index + 1}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Commission: {validator.commission}</span>
                            <span>APY: {validator.apy}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Network Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Network Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Staked</span>
                        <span className="text-sm font-medium">847.2M APT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Staking Ratio</span>
                        <span className="text-sm font-medium">67.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Active Validators</span>
                        <span className="text-sm font-medium">142</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Avg APY</span>
                        <span className="text-sm font-medium text-green-600">7.1%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                        View Staking History
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                        Export Rewards Report
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                        Validator Performance
                      </Button>
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
