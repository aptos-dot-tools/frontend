"use client"

import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk"
import { createSurfClient } from "@thalalabs/surf"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { createContext, useContext, useMemo, type ReactNode } from "react"

interface AptosContextType {
  aptos: Aptos
  surfClient: any
  network: Network
}

const AptosContext = createContext<AptosContextType | undefined>(undefined)

export function AptosProvider({ children }: { children: ReactNode }) {
  const { network } = useWallet()

  const aptosConfig = useMemo(() => {
    const networkName = network?.name === "testnet" ? Network.TESTNET : Network.MAINNET
    return new AptosConfig({ network: networkName })
  }, [network])

  const aptos = useMemo(() => new Aptos(aptosConfig), [aptosConfig])

  const surfClient = useMemo(() => {
    return createSurfClient(aptos)
  }, [aptos])

  const contextValue = useMemo(
    () => ({
      aptos,
      surfClient,
      network: aptosConfig.network,
    }),
    [aptos, surfClient, aptosConfig.network],
  )

  return <AptosContext.Provider value={contextValue}>{children}</AptosContext.Provider>
}

export function useAptos() {
  const context = useContext(AptosContext)
  if (context === undefined) {
    throw new Error("useAptos must be used within an AptosProvider")
  }
  return context
}