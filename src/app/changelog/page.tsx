"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type ChangelogItem = {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: string // ISO string
}

export default function ChangelogPage() {
  const [items, setItems] = useState<ChangelogItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/changelog", { cache: "no-store" })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: ChangelogItem[] = await res.json()
        setItems(data)
      } catch (e: any) {
        setError(e?.message ?? "載入失敗")
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  if (loading) return <p className="text-sm text-muted-foreground">載入中…</p>
  if (error)   return <p className="text-sm text-red-600">錯誤：{error}</p>

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold tracking-tight">更新日誌</h1>
      <div className="space-y-4">
        {items.map((i) => (
          <Card key={i.id}>
            <CardHeader>
              <CardTitle className="flex flex-wrap items-center gap-2">
                <span>{i.title}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(i.createdAt).toLocaleDateString("zh-TW")}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="whitespace-pre-wrap">{i.content}</p>
              <div className="flex flex-wrap gap-2">
                {i.tags?.map((t, idx) => (
                  <Badge key={idx} variant="secondary">#{t}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">尚無更新。</p>
        )}
      </div>
    </div>
  )
}
