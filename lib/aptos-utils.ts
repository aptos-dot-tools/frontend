import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk"

export const getAptosClient = (network: Network = Network.MAINNET) => {
  const config = new AptosConfig({ network })
  return new Aptos(config)
}

export const formatAptosAddress = (address: string) => {
  if (!address) return ""
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const getExplorerUrl = (address: string, network: Network = Network.MAINNET) => {
  const baseUrl =
    network === Network.MAINNET ? "https://explorer.aptoslabs.com" : "https://explorer.aptoslabs.com/?network=testnet"
  return `${baseUrl}/account/${address}`
}

export const formatBalance = (balance: string | number) => {
  const num = typeof balance === "string" ? Number.parseFloat(balance) : balance
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(num)
}
