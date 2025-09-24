"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { WalletConnectModal } from "./wallet-connect-modal"
import { useWallet } from "./wallet-provider"
import { Copy, ExternalLink, LogOut, Globe, Settings, Moon, Network } from "lucide-react"

export function Header() {
  const [showWalletModal, setShowWalletModal] = useState(false)
  const { connected, account, network, disconnect, changeNetwork } = useWallet()

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const copyAddress = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address)
    }
  }

  const handleNetworkSwitch = async (networkName: string) => {
    try {
      await changeNetwork(networkName)
    } catch (error) {
      console.error("Failed to switch network:", error)
    }
  }

  return (
    <>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          {/* Left side - Enhanced branding */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">A</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    aptos.tools
                  </div>
                  <div className="text-xs text-muted-foreground -mt-1">Developer Toolkit</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground overflow-hidden">
              <span className="flex-shrink-0">💡</span>
              <span className="truncate">Professional-grade tools for Aptos blockchain development</span>
            </div>
          </div>

          {/* Right side - Controls */}
          <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
            <Badge variant="default" className="bg-green-500 hover:bg-green-600 hidden sm:inline-flex">
              NEW
            </Badge>

            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center ${
                  network?.name === "mainnet" ? "bg-green-500" : "bg-yellow-500"
                }`}
              >
                <span className="text-white text-xs lg:text-sm font-bold">
                  {network?.name === "mainnet" ? "M" : "T"}
                </span>
              </div>
              <span className="text-sm font-medium hidden sm:inline capitalize">{network?.name || "mainnet"}</span>
            </div>

            {connected && account ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-green-50 border-green-200 hover:bg-green-100 text-xs lg:text-sm"
                  >
                    <div className="flex items-center gap-1 lg:gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="hidden sm:inline">{formatAddress(account.address)}</span>
                      <span className="sm:hidden">Connected</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <div className="p-3 border-b">
                    <div className="text-sm font-medium">Connected Wallet</div>
                    <div className="text-xs text-muted-foreground font-mono break-all">{account.address}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      Network: {network?.name || "mainnet"}
                    </div>
                  </div>
                  <DropdownMenuItem onClick={copyAddress}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Address
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Explorer
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleNetworkSwitch("mainnet")}
                    disabled={network?.name === "mainnet"}
                  >
                    <Network className="w-4 h-4 mr-2" />
                    Switch to Mainnet
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleNetworkSwitch("testnet")}
                    disabled={network?.name === "testnet"}
                  >
                    <Network className="w-4 h-4 mr-2" />
                    Switch to Testnet
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={disconnect} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setShowWalletModal(true)}>
                <span className="hidden sm:inline">Connect Wallet</span>
                <span className="sm:hidden">Connect</span>
              </Button>
            )}

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <Globe className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <Moon className="w-4 h-4" />
              </Button>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-sm">
              <span>🤖</span>
              <span>AptA...mdRP</span>
            </div>
          </div>
        </div>
      </header>

      <WalletConnectModal open={showWalletModal} onOpenChange={setShowWalletModal} />
    </>
  )
}
