"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type ChangelogItem = {
  id: string
  title: string
  content: string
  tags: string[]
  coverUrl?: string | null
  images?: string[]
  createdAt: string // ISO string
  published?: boolean
}

type ApiResponse = {
  items: ChangelogItem[]
  nextCursor: string | null
}

const PAGE_SIZE = 9

export default function ChangelogPage() {
  const [items, setItems] = useState<ChangelogItem[]>([])
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPage = useCallback(async (cursor?: string) => {
    const qs = new URLSearchParams()
    qs.set("limit", String(PAGE_SIZE))
    if (cursor) qs.set("cursor", cursor)

    const res = await fetch(`/api/changelog?${qs.toString()}`, { cache: "no-store" })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data: ApiResponse = await res.json()
    return data
  }, [])

  // 初次載入
  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        const data = await fetchPage()
        setItems(data.items)
        setNextCursor(data.nextCursor)
      } catch (err) {
        const message = err instanceof Error ? err.message : "載入失敗"
        setError(message)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [fetchPage])

  // 載入更多
  const loadMore = async () => {
    if (!nextCursor) return
    try {
      setLoadingMore(true)
      const data = await fetchPage(nextCursor)
      setItems(prev => [...prev, ...data.items])
      setNextCursor(data.nextCursor)
    } catch (err) {
      const message = err instanceof Error ? err.message : "載入失敗"
      setError(message)
    } finally {
      setLoadingMore(false)
    }
  }

  if (loading) return <p className="text-sm text-muted-foreground">載入中…</p>
  if (error) return <p className="text-sm text-red-600">錯誤：{error}</p>

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold tracking-tight">更新日誌</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <Card key={i.id} className="overflow-hidden hover:shadow-lg transition">
            <Link href={`/changelog/${i.id}`} className="block group">
              {/* 封面圖 */}
              {i.coverUrl && (
                <div className="relative aspect-[16/9]">
                  <Image
                    src={i.coverUrl}
                    alt={i.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              <CardHeader>
                <CardTitle className="flex flex-wrap items-center gap-2">
                  <span className="line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {i.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(i.createdAt).toLocaleDateString("zh-TW")}
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {i.content}
                </p>

                {i.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {i.tags.map((t) => (
                      <Badge key={`${i.id}-${t}`} variant="secondary">
                        #{t}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* 空狀態 */}
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground">尚無更新。</p>
      )}

      {/* 載入更多 */}
      {nextCursor && (
        <div className="flex justify-center pt-2">
          <Button onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? "載入中…" : "載入更多"}
          </Button>
        </div>
      )}
    </div>
  )
}
