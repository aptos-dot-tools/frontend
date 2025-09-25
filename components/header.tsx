"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { WalletConnectModal } from "./wallet-connect-modal"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { Copy, ExternalLink, LogOut, Network } from "lucide-react"

export function Header() {
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { connected, account, network, disconnect } = useWallet()

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const copyAddress = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address.toString())
      setShowDropdown(false)
    }
  }

  const handleNetworkSwitch = async (networkName: string) => {
    try {
      // In a real implementation, you would use the wallet adapter's network switching functionality
      console.log(`Switching to ${networkName}`)
      setShowDropdown(false)
    } catch (error) {
      console.error("Failed to switch network:", error)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

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
          </div>

          {/* Right side - Controls */}
          <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
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
              <div className="relative" ref={dropdownRef}>
                <Button
                  variant="outline"
                  className="bg-green-50 border-green-200 hover:bg-green-100 text-xs lg:text-sm cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="flex items-center gap-1 lg:gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="hidden sm:inline">{formatAddress(account.address.toString())}</span>
                    <span className="sm:hidden">Connected</span>
                  </div>
                </Button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-[1000]">
                    <div className="p-3 border-b">
                      <div className="text-sm font-medium">Connected Wallet</div>
                      <div className="text-xs text-muted-foreground font-mono break-all">{account.address.toString()}</div>
                      <div className="text-xs text-muted-foreground capitalize">
                        Network: {network?.name || "mainnet"}
                      </div>
                    </div>
                    <div 
                      className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                      onClick={copyAddress}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Address
                    </div>
                    <div 
                      className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setShowDropdown(false)
                        // Add explorer link functionality here
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Explorer
                    </div>
                    <div className="border-t my-1"></div>
                    <div 
                      className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${network?.name === "mainnet" ? "opacity-50" : ""}`}
                      onClick={() => handleNetworkSwitch("mainnet")}
                    >
                      <Network className="w-4 h-4 mr-2" />
                      Switch to Mainnet
                    </div>
                    <div 
                      className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${network?.name === "testnet" ? "opacity-50" : ""}`}
                      onClick={() => handleNetworkSwitch("testnet")}
                    >
                      <Network className="w-4 h-4 mr-2" />
                      Switch to Testnet
                    </div>
                    <div className="border-t my-1"></div>
                    <div 
                      className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        disconnect()
                        setShowDropdown(false)
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Disconnect
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setShowWalletModal(true)}>
                <span className="hidden sm:inline">Connect Wallet</span>
                <span className="sm:hidden">Connect</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <WalletConnectModal open={showWalletModal} onOpenChange={setShowWalletModal} />
    </>
  )
}