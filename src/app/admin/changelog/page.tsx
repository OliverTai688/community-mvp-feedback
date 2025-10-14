"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, PlusCircle } from "lucide-react"

// ✅ 定義明確型別，取代 any
interface ChangelogItem {
  id: string
  title: string
  content: string
  tags?: string[]
  createdAt: string
  updatedAt?: string
  published?: boolean
  coverUrl?: string | null
}

export default function ChangelogAdminList() {
  const [logs, setLogs] = useState<ChangelogItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLogs = async (): Promise<void> => {
    try {
      const res = await fetch("/api/changelog?limit=50&includeUnpublished=true", {
        headers: {
          "x-admin-token": process.env.NEXT_PUBLIC_ADMIN_TOKEN || "",
        },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to fetch changelog list")

      // ✅ 確保 items 為陣列
      setLogs(Array.isArray(data.items) ? data.items : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "無法載入資料")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchLogs()
  }, [])

  const handleDelete = async (id: string): Promise<void> => {
    const token = prompt("請輸入管理密碼以刪除此項目：")
    if (!token) return
    if (!confirm("確定要刪除這筆更新日誌嗎？")) return

    const res = await fetch(`/api/changelog/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
    const data = await res.json()
    if (!res.ok) return alert(`刪除失敗：${data.error || res.statusText}`)
    alert("刪除成功")
    void fetchLogs()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-blue-950/20 dark:to-indigo-950/30 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100">
            📝 更新日誌管理
          </h1>
          <Link href="/admin/changelog/new">
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              新增更新
            </Button>
          </Link>
        </div>

        {loading ? (
          <p className="text-slate-500 dark:text-slate-400">載入中…</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : logs.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">目前沒有更新記錄。</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {logs.map((log) => (
              <Card
                key={log.id}
                className="border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold line-clamp-1">
                    {log.title}
                  </CardTitle>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {new Date(log.createdAt).toLocaleString("zh-TW")}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-3">
                    {log.content.slice(0, 80)}...
                  </p>

                  {log.tags && log.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {log.tags.map((tag: string, i: number) => (
                        <Badge key={`${log.id}-${i}`} variant="secondary">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-end gap-2 pt-2">
                    <Link href={`/admin/changelog/${log.id}/edit`}>
                      <Button size="sm" variant="outline">
                        <Pencil className="w-4 h-4 mr-1" /> 編輯
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(log.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> 刪除
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
