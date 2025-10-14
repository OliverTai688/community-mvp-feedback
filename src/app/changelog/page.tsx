"use client"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChangelogCard } from "@/components/changelog/ChangelogCard"

// === 型別定義 ===
interface ChangelogItem {
  id: string
  title: string
  content: string
  tags: string[]
  coverUrl?: string | null
  images?: string[]
  createdAt: string
  published?: boolean
}

interface ApiResponse {
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

  const fetchPage = useCallback(async (cursor?: string): Promise<ApiResponse> => {
    const qs = new URLSearchParams()
    qs.set("limit", String(PAGE_SIZE))
    if (cursor) qs.set("cursor", cursor)

    const res = await fetch(`/api/changelog?${qs.toString()}`, { cache: "no-store" })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return (await res.json()) as ApiResponse
  }, [])

  useEffect(() => {
    const run = async (): Promise<void> => {
      try {
        setLoading(true)
        const data = await fetchPage()
        setItems(data.items)
        setNextCursor(data.nextCursor)
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "載入失敗"
        setError(message)
      } finally {
        setLoading(false)
      }
    }
    void run()
  }, [fetchPage])

  const loadMore = async (): Promise<void> => {
    if (!nextCursor) return
    try {
      setLoadingMore(true)
      const data = await fetchPage(nextCursor)
      setItems((prev) => [...prev, ...data.items])
      setNextCursor(data.nextCursor)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "載入失敗"
      setError(message)
    } finally {
      setLoadingMore(false)
    }
  }

  if (loading) return <p className="text-sm text-muted-foreground">載入中…</p>
  if (error) return <p className="text-sm text-red-600">錯誤：{error}</p>

  return (
    <div className="space-y-8 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
        更新日誌
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item: ChangelogItem) => (
          <ChangelogCard
            key={item.id}
            id={item.id}
            title={item.title}
            content={item.content}
            createdAt={item.createdAt}
            coverUrl={item.coverUrl ?? undefined}
            tags={item.tags ?? []}
          />
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-12">尚無更新。</p>
      )}

      {nextCursor && (
        <div className="flex justify-center pt-6">
          <Button onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? "載入中…" : "載入更多"}
          </Button>
        </div>
      )}
    </div>
  )
}
