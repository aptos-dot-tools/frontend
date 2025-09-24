"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useWallet } from "./wallet-provider"

interface WalletConnectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WalletConnectModal({ open, onOpenChange }: WalletConnectModalProps) {
  const { wallets, connect, connecting } = useWallet()
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  const handleConnect = async (walletName: string) => {
    setSelectedWallet(walletName)
    try {
      await connect(walletName)
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      alert(`Failed to connect to ${walletName}. Please make sure the wallet extension is installed and try again.`)
    } finally {
      setSelectedWallet(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>Choose your preferred Aptos wallet to connect to aptos.tools</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {wallets.map((wallet) => (
            <Button
              key={wallet.name}
              variant="outline"
              className="w-full justify-start h-auto p-4 bg-transparent"
              onClick={() => handleConnect(wallet.name)}
              disabled={connecting}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-2xl">
                    {wallet.icon}
                  </div>
                </div>
                <div className="text-left">
                  <div className="font-medium">{wallet.name}</div>
                  <div className="text-sm text-muted-foreground">{wallet.description}</div>
                </div>
              </div>
              {connecting && selectedWallet === wallet.name && (
                <div className="ml-auto">
                  <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </Button>
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          By connecting a wallet, you agree to our Terms of Service and Privacy Policy
        </div>
      </DialogContent>
    </Dialog>
  )
}
