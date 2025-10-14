"use client"


import Link from "next/link"
import { ArrowRight, Sparkles, Calendar } from "lucide-react"
import { motion, type Variants, cubicBezier } from "framer-motion"
import { ChangelogCard } from "@/components/changelog/ChangelogCard"

type Item = {
  id: string
  title: string
  content: string
  createdAt: string // 序列化後日期
}

export default function LatestChangelog({ items }: { items: Item[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  // ✅ 使用 cubicBezier() 修正
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) },
    },
  }

  // 計算日期距離現在多久
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return "今天"
    if (diffInDays === 1) return "昨天"
    if (diffInDays < 7) return `${diffInDays} 天前`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} 週前`
    return date.toLocaleDateString("zh-TW", { month: "long", day: "numeric" })
  }

  return (
    <section className="space-y-6 py-4">
      {/* 標題區塊 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-200/30 dark:border-blue-800/30">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
              最新更新
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              追蹤最新功能與改進
            </p>
          </div>
        </div>

        <Link
          href="/changelog"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 text-sm font-medium"
        >
          查看全部
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* 卡片網格 */}
      {items.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ChangelogCard
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
              createdAt={item.createdAt}
            />
          ))}
        </div>
      ) : (
        // 空狀態
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm p-12"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
          <div className="relative flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-4 rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-200/30 dark:border-blue-800/30">
              <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                暫無更新內容
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                敬請期待即將推出的新功能與改進
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>持續開發中</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* 底部裝飾 */}
      {items.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400 pt-2"
        >
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          </div>
          <span>每週持續更新</span>
        </motion.div>
      )}
    </section>
  )
}