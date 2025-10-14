"use client"

import { motion } from "framer-motion"
import { AnimatedGridPattern } from "../ui/animated-grid-pattern"
import { AuroraText } from "../ui/aurora-text"
import { AnimatedShinyText } from "../ui/animated-shiny-text"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Bot, Megaphone, MessageSquare, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export default function HeroMagic() {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl",
        "bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50",
        "dark:from-slate-950 dark:via-blue-950/20 dark:to-indigo-950/30"
      )}
    >
      {/* 背景：動態網格 */}
      <AnimatedGridPattern
        numSquares={32}
        maxOpacity={0.08}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />

      {/* 光暈效果 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-400/20 via-indigo-400/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-purple-400/15 via-pink-400/8 to-transparent blur-3xl" />

      {/* 主容器 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-6xl px-6 py-16 md:py-24 text-center"
      >
        {/* 頂部標籤 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-200/30 dark:border-blue-800/30 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            客戶專屬社群
          </span>
        </motion.div>

        {/* 主標題 */}
        <AuroraText
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
          colors={["#3b82f6", "#6366f1", "#8b5cf6"]}
        >
          與 OneLink 一起
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            共創智慧未來
          </span>
        </AuroraText>

        {/* 副標題 */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          即時更新通知、快速回饋通道、搶先體驗新功能
          <br className="hidden md:block" />
          <span className="text-blue-600 dark:text-blue-400 font-medium">
            與社群一起打造最貼近你的 AI 工具
          </span>
        </motion.p>

        {/* CTA 按鈕組 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* 主 CTA */}
          <Button
            asChild
            size="lg"
            className={cn(
              "relative group overflow-hidden border-none shadow-lg shadow-blue-500/25",
              "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white",
              "hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
            )}
          >
            <Link href="/spinai" aria-label="前往體驗 SpinAI">
              <AnimatedShinyText className="inline-flex items-center text-white font-semibold">
                <Bot className="mr-2 h-5 w-5 text-white group-hover:rotate-12 transition-transform" />
                SpinAI 即將推出
              </AnimatedShinyText>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </Link>
          </Button>

          {/* 次要 CTA */}
          <Button
            variant="outline"
            asChild
            size="lg"
            className={cn(
              "group border-2 border-slate-200 dark:border-slate-700",
              "bg-white/60 dark:bg-slate-900/60 backdrop-blur-md",
              "hover:bg-white dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-700",
              "hover:shadow-lg transition-all duration-300"
            )}
          >
            <Link href="/changelog" aria-label="查看更新日誌">
              <Megaphone className="mr-2 h-5 w-5 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              <span className="font-medium text-slate-700 dark:text-slate-200">查看更新</span>
            </Link>
          </Button>

          {/* 第三 CTA */}
          <Button
            variant="ghost"
            asChild
            size="lg"
            className={cn(
              "group",
              "hover:bg-slate-100 dark:hover:bg-slate-800",
              "transition-all duration-300"
            )}
          >
            <Link href="/feedback" aria-label="前往回饋頁">
              <MessageSquare className="mr-2 h-5 w-5 text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
              <span className="font-medium text-slate-700 dark:text-slate-300">提供回饋</span>
            </Link>
          </Button>
        </motion.div>

        {/* 底部特色標籤 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>即時更新</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>快速回應</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span>搶先體驗</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}