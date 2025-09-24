import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { WalletProvider } from "@/components/wallet-provider"
import { AptosProvider } from "@/components/aptos-client"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "aptos.tools - The Ultimate Aptos Developer Toolkit",
  description:
    "Professional-grade tools for Aptos blockchain development. Token creation, multi-sender, staking, and more - all in one powerful platform.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <AptosProvider>
            <div className="flex h-screen bg-background">
              <div className="fixed inset-y-0 left-0 z-40 w-64">
                <Sidebar />
              </div>
              <div className="flex flex-col flex-1 w-full ml-64">
                <div className="fixed top-0 left-64 right-0 z-30 h-16">
                  <Header />
                </div>
                <main className="flex-1 overflow-auto pt-16">
                  <div className="p-4 lg:p-6">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </AptosProvider>
        </WalletProvider>
      </body>
    </html>
  )
}