"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Clock, Sparkles, Calendar } from "lucide-react"
import { motion, type Variants, cubicBezier } from "framer-motion"

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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, idx) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Card className="group relative h-full overflow-hidden border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
                {/* 卡片背景裝飾 */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* 新標籤 (如果是最近 3 天) */}
                {new Date().getTime() - new Date(item.createdAt).getTime() < 3 * 24 * 60 * 60 * 1000 && (
                  <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200/30 dark:border-green-800/30 backdrop-blur-sm">
                    <span className="text-xs font-medium text-green-700 dark:text-green-300 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      New
                    </span>
                  </div>
                )}

                <CardHeader className="relative pb-3">
                  <CardTitle className="text-lg font-semibold line-clamp-2 text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative pb-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {item.content}
                  </p>
                </CardContent>

                <CardFooter className="relative flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  {/* 時間標籤 */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-medium">{getTimeAgo(item.createdAt)}</span>
                  </div>

                  {/* 詳細連結 */}
                  <Link
                    href={`/changelog/${item.id}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group/link"
                  >
                    閱讀更多
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </CardFooter>

                {/* 懸浮邊框效果 */}
                <div className="absolute inset-0 rounded-lg border-2 border-blue-400/0 group-hover:border-blue-400/20 dark:group-hover:border-blue-600/20 transition-all duration-300 pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
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