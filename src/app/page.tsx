import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Megaphone, MessageSquare, Bot } from "lucide-react"

export default async function HomePage() {
  const latest = await prisma.changelog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  })
  // 單筆型別（避免 any）
  type Row = typeof latest[number]

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">歡迎加入</h1>
        <p className="text-muted-foreground">我們每週透明發布更新，並主動邀請使用者回饋。</p>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/feedback"><MessageSquare className="mr-2 h-4 w-4" /> 給回饋</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/changelog"><Megaphone className="mr-2 h-4 w-4" /> 看更新</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/spinai"><Bot className="mr-2 h-4 w-4" /> 體驗 SpinAI</Link>
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">最新更新</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {latest.map((i: Row) => (
            <Card key={i.id} className="h-full">
              <CardHeader>
                <CardTitle className="line-clamp-2">{i.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{i.content}</p>
              </CardContent>
            </Card>
          ))}
          {latest.length === 0 && (
            <p className="text-sm text-muted-foreground">尚無更新，敬請期待。</p>
          )}
        </div>
      </section>
    </div>
  )
}
