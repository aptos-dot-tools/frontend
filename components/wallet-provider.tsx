"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface WalletContextType {
  connected: boolean
  account: { address: string } | null
  network: { name: string } | null
  wallets: Array<{ name: string; icon: string; description: string }>
  connect: (walletName: string) => Promise<void>
  disconnect: () => void
  changeNetwork: (network: string) => Promise<void>
  connecting: boolean
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

const availableWallets = [
  {
    name: "Petra",
    icon: "🟠",
    description: "The most popular Aptos wallet",
  },
  {
    name: "Martian",
    icon: "🔴",
    description: "Multi-chain wallet with Aptos support",
  },
  {
    name: "Pontem Wallet",
    icon: "🟣",
    description: "Native Aptos wallet by Pontem",
  },
  {
    name: "Fewcha",
    icon: "🟡",
    description: "Secure Aptos wallet extension",
  },
]

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [account, setAccount] = useState<{ address: string } | null>(null)
  const [network, setNetwork] = useState<{ name: string }>({ name: "mainnet" })
  const [connecting, setConnecting] = useState(false)

  const connect = async (walletName: string) => {
    setConnecting(true)
    try {
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockAddress =
        network.name === "mainnet"
          ? "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12"
          : "0xtest1234567890abcdef1234567890abcdef12"

      setConnected(true)
      setAccount({ address: mockAddress })

      localStorage.setItem("wallet_connected", "true")
      localStorage.setItem("wallet_address", mockAddress)
      localStorage.setItem("wallet_network", network.name)
      localStorage.setItem("wallet_name", walletName)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      throw error
    } finally {
      setConnecting(false)
    }
  }

  const disconnect = () => {
    setConnected(false)
    setAccount(null)
    localStorage.removeItem("wallet_connected")
    localStorage.removeItem("wallet_address")
    localStorage.removeItem("wallet_network")
    localStorage.removeItem("wallet_name")
  }

  const changeNetwork = async (networkName: string) => {
    try {
      setNetwork({ name: networkName })
      localStorage.setItem("wallet_network", networkName)

      if (connected) {
        const mockAddress =
          networkName === "mainnet"
            ? "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12"
            : "0xtest1234567890abcdef1234567890abcdef12"

        setAccount({ address: mockAddress })
        localStorage.setItem("wallet_address", mockAddress)
      }
    } catch (error) {
      console.error("Failed to switch network:", error)
      throw error
    }
  }

  useEffect(() => {
    const isConnected = localStorage.getItem("wallet_connected")
    const storedAddress = localStorage.getItem("wallet_address")
    const storedNetwork = localStorage.getItem("wallet_network") || "mainnet"

    setNetwork({ name: storedNetwork })

    if (isConnected && storedAddress) {
      setConnected(true)
      setAccount({ address: storedAddress })
    }
  }, [])

  return (
    <WalletContext.Provider
      value={{
        connected,
        account,
        network,
        wallets: availableWallets,
        connect,
        disconnect,
        changeNetwork,
        connecting,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
