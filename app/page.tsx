import { ToolCard } from "@/components/tool-card"
import { Badge } from "@/components/ui/badge"

const popularTools = [
  {
    id: "token-creation",
    title: "Token Creation",
    description: "Create Aptos token in 1 min, customize permissions, launch SPL token in one click!",
    icon: "🪙",
    href: "/tools/token-creator",
  },
  {
    id: "multi-sender",
    title: "Multi Sender",
    description: "Efficient airdrop! Batch-send tokens easily, more transfers, lower cost!",
    icon: "📤",
    href: "/tools/multi-sender",
  },
  {
    id: "multi-swap",
    title: "Multi Swap",
    description: "Manage multiple accounts freely, execute trades efficiently!",
    icon: "🔄",
    href: "/tools/multi-swap",
  },
  {
    id: "apt-staking",
    title: "APT Staking Manager",
    description: "Stake APT tokens with validators, manage delegations, and earn rewards efficiently!",
    icon: "🏦",
    href: "/tools/apt-staking",
  },
  {
    id: "batch-collection",
    title: "Batch Collection",
    description: "One-click gather funds, quick to main account, saving time & cost!",
    icon: "📦",
    href: "/tools/batch-collection",
  },
  {
    id: "new-address-buy",
    title: "New Address Buy (1 Makers)",
    description: "Auto-generate wallets, preset amounts, boost on-chain data, stand out!",
    icon: "💰",
    href: "/tools/new-address-buy",
  },
]

const newlyLaunched = [
  {
    id: "new-address-holders",
    title: "New Address Buy (1 Holders)",
    description: "Generate new wallet addresses for token purchases",
    icon: "👥",
    href: "/tools/new-address-holders",
  },
  {
    id: "sell-bundled-buy",
    title: "Sell and Bundled Buy",
    description: "Advanced trading strategies with bundled operations",
    icon: "📊",
    href: "/tools/sell-bundled-buy",
  },
  {
    id: "bundled-buy",
    title: "Bundled Buy",
    description: "Execute multiple buy orders simultaneously",
    icon: "🎯",
    href: "/tools/bundled-buy",
  },
  {
    id: "moonshot-section",
    title: "MoonShot Section",
    description: "Advanced trading tools for high-potential tokens",
    icon: "🌙",
    href: "/tools/moonshot-section",
  },
  {
    id: "multi-transfer",
    title: "Multi-to-Multi Transfer",
    description: "Transfer tokens between multiple addresses efficiently",
    icon: "🔀",
    href: "/tools/multi-transfer",
  },
]

export default function HomePage() {
  return (
    <main className="flex-1 p-4 lg:p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">A</span>
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent text-balance">
                  aptos.tools
                </h1>
                <p className="text-lg text-muted-foreground">The Ultimate Aptos Developer Toolkit</p>
              </div>
            </div>
            <p className="text-muted-foreground text-base lg:text-lg text-pretty">
              Professional-grade tools for Aptos blockchain development. Simple · Safe · Efficient.
            </p>

            {/* Blockchain badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              <Badge variant="default" className="bg-orange-500 hover:bg-orange-600">
                APTOS
              </Badge>
              <Badge variant="secondary">BNB Chain</Badge>
              <Badge variant="secondary">BASE</Badge>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Ethereum
              </Badge>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                X Layer
              </Badge>
              <Badge variant="secondary" className="hidden md:inline-flex">
                TRON
              </Badge>
              <Badge variant="secondary" className="hidden md:inline-flex">
                TON
              </Badge>
            </div>
          </div>

          {/* Hero illustration */}
          <div className="hidden lg:block flex-shrink-0">
            <div className="w-80 xl:w-96 h-48 xl:h-64 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center">
              <div className="text-4xl xl:text-6xl">🔧</div>
            </div>
          </div>
        </div>

        {/* Popular Tools Section */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-xl lg:text-2xl font-semibold">Popular Tools</h2>
              <Badge variant="destructive" className="bg-red-500">
                HOT
              </Badge>
            </div>
            <span className="text-muted-foreground text-sm lg:text-base">/ Most Popular Tools for Devs</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {popularTools.map((tool) => (
              <ToolCard key={tool.id} {...tool} />
            ))}
          </div>
        </section>

        {/* Newly Launched Section */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-xl lg:text-2xl font-semibold">Newly Launched</h2>
              <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                NEW
              </Badge>
            </div>
            <span className="text-muted-foreground text-sm lg:text-base">/ New Feature, Try First</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
            {newlyLaunched.map((tool) => (
              <ToolCard key={tool.id} {...tool} variant="compact" />
            ))}
          </div>
        </section>

        {/* Test content to verify scrolling fix */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Scrolling Test Content</h2>
          <p className="mb-4">This is test content to verify that the header and sidebar stay fixed while the main content scrolls.</p>
          
          {/* Generate a lot of content to test scrolling */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="mb-8 p-4 bg-muted rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Section {i + 1}</h3>
              <p className="mb-2">This is test content to verify that the header and sidebar stay fixed while the main content scrolls.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}