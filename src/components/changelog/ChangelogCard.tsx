"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import DOMPurify from "isomorphic-dompurify" // 👈 新增這行（確保 SSR 可用）

type ChangelogCardProps = {
  id: string
  title: string
  content: string
  createdAt: string
  coverUrl?: string
  tags?: string[]
}

export function ChangelogCard({ id, title, content, createdAt, coverUrl, tags = [] }: ChangelogCardProps) {
  const isNew = new Date().getTime() - new Date(createdAt).getTime() < 3 * 24 * 60 * 60 * 1000

  // 🕓 時間格式
  const getTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours < 24) return `${hours} 小時前`
    const days = Math.floor(hours / 24)
    return `${days} 天前`
  }

  // 🧼 安全清理 HTML
  const safeHTML = DOMPurify.sanitize(content)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="group relative h-full overflow-hidden border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
        {/* 背景光暈 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* NEW 標籤 */}
        {isNew && (
          <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200/30 backdrop-blur-sm">
            <span className="text-xs font-medium text-green-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              New
            </span>
          </div>
        )}

        {/* 封面圖 */}
        {coverUrl && (
          <div className="relative aspect-[16/9]">
            <Image
              src={coverUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* 內文區塊 */}
        <CardHeader className="relative pb-3">
          <CardTitle className="text-lg font-semibold line-clamp-2 text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="relative pb-4 space-y-3">
          {/* ✅ 改成渲染 HTML */}
          {/* <div
            className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 prose prose-slate dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: safeHTML }}
          /> */}

          {/* 標籤區 */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={`${id}-${tag}`} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

        {/* 底部資訊 */}
        <CardFooter className="relative flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-medium">{getTimeAgo(createdAt)}</span>
          </div>

          <Link
            href={`/changelog/${id}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 group/link"
          >
            閱讀更多
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
