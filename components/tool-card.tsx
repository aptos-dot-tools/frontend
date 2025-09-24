import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ToolCardProps {
  id: string
  title: string
  description: string
  icon: string
  href: string
  variant?: "default" | "compact"
}

export function ToolCard({ title, description, icon, href, variant = "default" }: ToolCardProps) {
  if (variant === "compact") {
    return (
      <Link href={href}>
        <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.02] group">
          <CardContent className="p-4 text-center">
            <div className="text-2xl lg:text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
              {icon}
            </div>
            <h3 className="font-semibold text-sm mb-1 text-balance">{title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2 text-pretty">{description}</p>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={href}>
      <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.02] group">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-lg flex items-center justify-center text-xl lg:text-2xl group-hover:bg-orange-200 transition-colors duration-200">
              {icon}
            </div>
            <CardTitle className="text-base lg:text-lg text-balance">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm leading-relaxed text-pretty">{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}
