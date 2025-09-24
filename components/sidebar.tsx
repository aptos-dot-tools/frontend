"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "Home",
    href: "/",
    icon: "🏠",
  },
  {
    title: "Newly Launched",
    icon: "🆕",
    children: [
      { title: "New Address Buy (1 Holders)", href: "/tools/new-address-holders" },
      { title: "Sell and Bundled Buy", href: "/tools/sell-bundled-buy" },
      { title: "Bundled Buy", href: "/tools/bundled-buy" },
      { title: "MoonShot Section", href: "/tools/moonshot-section" },
      { title: "Multi-to-Multi Transfer", href: "/tools/multi-transfer" },
    ],
  },
  {
    title: "Popular Tools",
    icon: "🔥",
    children: [
      { title: "Token Creation", href: "/tools/token-creator" },
      { title: "Multi Sender", href: "/tools/multi-sender" },
      { title: "Multi Swap", href: "/tools/multi-swap" },
      { title: "APT Staking Manager", href: "/tools/apt-staking" },
      { title: "Batch Collection", href: "/tools/batch-collection" },
      { title: "New Address Buy (1 Makers)", href: "/tools/new-address-buy" },
    ],
  },
  {
    title: "Token Manage",
    icon: "🪙",
    children: [
      { title: "Token Creation", href: "/tools/token-creator" },
      { title: "Tax Token Creation", href: "/tools/tax-token-creator" },
      { title: "Token Vanity Creator", href: "/tools/token-vanity-creator" },
      { title: "Clone Token", href: "/tools/clone-token" },
      { title: "Token Issuance", href: "/tools/token-issuance" },
      { title: "Token Update", href: "/tools/token-update" },
      { title: "Revoke Permission", href: "/tools/revoke-permission" },
      { title: "Freeze Account", href: "/tools/freeze-account" },
      { title: "Auto Freeze Account", href: "/tools/auto-freeze-account" },
    ],
  },
  {
    title: "Liquidity Manage",
    icon: "💧",
    children: [
      { title: "Batch Wallet Generation", href: "/tools/batch-wallet-generation" },
      { title: "Vanity Address Generator", href: "/tools/vanity-address-generator" },
      { title: "Batch Balance Checker", href: "/tools/batch-balance-checker" },
      { title: "Wallet Asset Migration", href: "/tools/wallet-asset-migration" },
      { title: "Recovery Rent", href: "/tools/recovery-rent" },
      { title: "Batch Reclaim Rent", href: "/tools/batch-reclaim-rent" },
      { title: "Wallet Manager", href: "/tools/wallet-manager" },
    ],
  },
  {
    title: "Wallet Manage",
    icon: "👛",
    children: [
      { title: "Multi Sender", href: "/tools/multi-sender" },
      { title: "Batch Collection", href: "/tools/batch-collection" },
      { title: "Multi Swap", href: "/tools/multi-swap" },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(["Popular Tools"])
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const closeMobile = () => setIsMobileOpen(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={closeMobile} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:transform-none h-full flex flex-col",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Mobile Close Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 lg:hidden text-white hover:bg-slate-800"
          onClick={closeMobile}
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="p-4 border-b border-slate-700">
          <Link href="/" className="flex items-center gap-3" onClick={closeMobile}>
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                aptos.tools
              </div>
              <div className="text-xs text-slate-400">Developer Toolkit</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          {sidebarItems.map((item) => (
            <div key={item.title} className="mb-1">
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpanded(item.title)}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-slate-800 transition-colors",
                      expandedItems.includes(item.title) && "bg-slate-800",
                    )}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="flex-1 text-left">{item.title}</span>
                    {expandedItems.includes(item.title) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>

                  {expandedItems.includes(item.title) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMobile}
                          className={cn(
                            "block px-3 py-2 rounded-lg text-sm hover:bg-slate-800 transition-colors",
                            pathname === child.href && "bg-orange-500 hover:bg-orange-600",
                          )}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={closeMobile}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-slate-800 transition-colors",
                    pathname === item.href && "bg-orange-500 hover:bg-orange-600",
                  )}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4">
          <div className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg">
            <div className="text-2xl">📚</div>
            <div>
              <div className="text-sm font-medium">Help Center</div>
              <div className="text-xs text-slate-400">White Paper / User Guide</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}