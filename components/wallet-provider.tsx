"use client"

import { ReactNode } from "react"
import { 
  AptosWalletAdapterProvider
} from "@aptos-labs/wallet-adapter-react"
import { Network } from "@aptos-labs/ts-sdk"

interface WalletProviderProps {
  children: ReactNode
}

const dappConfig = {
  aptosConnect: {
    dappName: "aptos.tools - The Ultimate Aptos Developer Toolkit",
  },
  network: Network.MAINNET,
}

export function WalletProvider({ children }: WalletProviderProps) {
  return (
    <AptosWalletAdapterProvider
      dappConfig={dappConfig}
      autoConnect={true}
    >
      {children}
    </AptosWalletAdapterProvider>
  )
}

// Re-export the useWallet hook for convenience
export { useWallet } from "@aptos-labs/wallet-adapter-react"