"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, AlertCircle } from "lucide-react"

export default function TokenCreatorPage() {
  const [formData, setFormData] = useState({
    tokenName: "",
    tokenSymbol: "",
    decimals: "6",
    supply: "",
    description: "",
    addSocialLinks: false,
    revokeUpdate: false,
    revokeFreeze: false,
    revokeMint: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Aptos Token Creator</h1>
              <p className="text-muted-foreground">
                Effortlessly Create your Aptos token! Tailor every detail, and launch your unique token instantly with
                our easy-to-use Aptos token creator.
              </p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600">Clone Token Information</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tokenName">Token Name *</Label>
                    <Input
                      id="tokenName"
                      placeholder="Enter token name"
                      value={formData.tokenName}
                      onChange={(e) => handleInputChange("tokenName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tokenSymbol">Token Symbol *</Label>
                    <Input
                      id="tokenSymbol"
                      placeholder="Enter token symbol"
                      value={formData.tokenSymbol}
                      onChange={(e) => handleInputChange("tokenSymbol", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="decimals">Decimals *</Label>
                    <Input
                      id="decimals"
                      value={formData.decimals}
                      onChange={(e) => handleInputChange("decimals", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="supply">Supply *</Label>
                    <Input
                      id="supply"
                      placeholder="Enter the total number of tokens"
                      value={formData.supply}
                      onChange={(e) => handleInputChange("supply", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Token Description:</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter Token Description"
                    className="min-h-[100px]"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="logo">Token Logo:</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <Button variant="outline">Click to Upload</Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Supported image formats: PNG/GIF/JPG/WEBP and JPEG
                      <br />
                      Recommended size: 200×200 pixels
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      If it meets the above requirements, it can be better displayed on various platforms and
                      applications.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="socialLinks">Add Social Links</Label>
                  <Switch
                    id="socialLinks"
                    checked={formData.addSocialLinks}
                    onCheckedChange={(checked) => handleInputChange("addSocialLinks", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Permissions */}
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="revokeUpdate"
                        checked={formData.revokeUpdate}
                        onCheckedChange={(checked) => handleInputChange("revokeUpdate", checked)}
                      />
                      <Label htmlFor="revokeUpdate" className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Revoke Update (Immutable)
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Renouncing ownership means you will not be able to modify the token metadata. It indeed makes
                      investors feel more secure.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="revokeFreeze"
                        checked={formData.revokeFreeze}
                        onCheckedChange={(checked) => handleInputChange("revokeFreeze", checked)}
                      />
                      <Label htmlFor="revokeFreeze" className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Revoke Freeze
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Revoking Freeze Authority removes control over specific account actions. ApptoseTools supports
                      markets for tokens with this authority retained.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="revokeMint"
                        checked={formData.revokeMint}
                        onCheckedChange={(checked) => handleInputChange("revokeMint", checked)}
                      />
                      <Label htmlFor="revokeMint" className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Revoke Mint
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Relinquishing minting rights is essential for investor security and token success, preventing
                      further token supply.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Warning */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                <div className="text-sm">
                  <p className="text-orange-800">
                    The process of creating tokens is significantly influenced by the local network environment. If it
                    continues to fail, try switching to a more stable network or activate the global mode of a VPN
                    before proceeding with the operation.
                  </p>
                </div>
              </div>
            </div>

            {/* Create Button */}
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg" size="lg">
              Create Token
            </Button>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Token Creation Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Step 1: Basic Information</h4>
                  <p className="text-sm text-muted-foreground">
                    Fill in your token name, symbol, decimals, and total supply.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Step 2: Token Details</h4>
                  <p className="text-sm text-muted-foreground">
                    Add description and upload your token logo for better recognition.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Step 3: Permissions</h4>
                  <p className="text-sm text-muted-foreground">
                    Configure token permissions for security and investor confidence.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cost Estimation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Network Fee:</span>
                    <span className="text-sm font-medium">~0.001 APT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Service Fee:</span>
                    <span className="text-sm font-medium">0.1 APT</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>~0.101 APT</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Tokens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      T
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">TestToken</p>
                      <p className="text-xs text-muted-foreground">TST</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Success
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
