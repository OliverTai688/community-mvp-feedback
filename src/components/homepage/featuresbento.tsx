"use client"

import { BentoCard, BentoGrid } from "../ui/bento-grid"
import { Highlighter } from "../ui/highlighter"
import { Bot, Megaphone, MessageSquare, Sparkles, Rocket, Zap } from "lucide-react"
import { motion, type Variants, cubicBezier } from "framer-motion"
import { useEffect, useState } from "react"

export default function FeaturesBento() {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    const features = [
        // {
        //     Icon: Bot,
        //     name: "體驗 誠問AI",
        //     description: "立即體驗 AI 對話與推進工具,感受智慧驅動的生產力提升。",
        //     href: "/spinai",
        //     cta: "查看更多",
        //     badge: "最受歡迎",
        //     badgeColor: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
        //     iconClass:
        //         "bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600",
        //     iconBg: "bg-blue-500/10 group-hover:bg-blue-500/20",
        //     background: (
        //         <div className="absolute inset-0 overflow-hidden">
        //             <motion.div
        //                 initial={{ opacity: 0, scale: 0.8 }}
        //                 whileInView={{ opacity: 1, scale: 1 }}
        //                 transition={{ duration: 0.8 }}
        //                 className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-gradient-to-br from-blue-300/40 via-indigo-300/30 to-purple-300/20 blur-3xl"
        //             />
        //             <motion.div
        //                 initial={{ opacity: 0, scale: 0.8 }}
        //                 whileInView={{ opacity: 1, scale: 1 }}
        //                 transition={{ duration: 0.8, delay: 0.2 }}
        //                 className="absolute left-10 bottom-10 w-48 h-48 rounded-full bg-blue-200/30 blur-2xl"
        //             />
        //             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.05),transparent)]" />
        //         </div>
        //     ),
        //     className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2",
        // },
        {
            Icon: Megaphone,
            name: "更新日誌",
            description: "每週透明發布進度報告,了解我們如何快速迭代優化產品功能。",
            href: "/changelog",
            cta: "查看更新",
            badge: "每週更新",
            badgeColor: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
            iconClass:
                "bg-gradient-to-br from-indigo-400 via-blue-500 to-cyan-400",
            iconBg: "bg-indigo-500/10 group-hover:bg-indigo-500/20",
            background: (
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute -top-16 -right-10 w-64 h-64 bg-gradient-to-bl from-indigo-300/35 to-blue-300/25 rounded-full blur-3xl"
                    />
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="absolute left-6 bottom-6 w-32 h-32 bg-cyan-200/25 rounded-full blur-2xl"
                    />
                </div>
            ),
            className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
        },
        {
            Icon: MessageSquare,
            name: "用戶回饋",
            description: "你的建議直接影響產品 Roadmap,與我們一起共創更好的使用體驗。",
            href: "/feedback",
            cta: "提供意見",
            badge: "社群驅動",
            badgeColor: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
            iconClass:
                "bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600",
            iconBg: "bg-cyan-500/10 group-hover:bg-cyan-500/20",
            background: (
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="absolute left-10 top-10 w-56 h-56 bg-gradient-to-tr from-cyan-300/35 to-blue-300/25 rounded-full blur-3xl"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.05),transparent)]" />
                </div>
            ),
            className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
        },
        {
            Icon: Rocket,
            name: "即將推出",
            description: "全新客製化 AI 模組與智慧工作流正在開發中,敬請期待下一波重大升級。",
            href: "#",
            cta: "搶先預覽",
            badge: "開發中",
            badgeColor: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
            iconClass:
                "bg-gradient-to-br from-purple-400 via-pink-500 to-rose-400",
            iconBg: "bg-purple-500/10 group-hover:bg-purple-500/20",
            background: (
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute -bottom-10 -right-10 w-72 h-72 bg-gradient-to-tl from-purple-300/35 via-pink-300/25 to-rose-300/20 rounded-full blur-3xl"
                    />
                    <motion.div
                        initial={{ opacity: 0, rotate: -20 }}
                        whileInView={{ opacity: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="absolute top-1/4 left-1/4 w-40 h-40 bg-pink-200/20 rounded-full blur-2xl"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(168,85,247,0.05),transparent)]" />
                </div>
            ),
            className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-3",
        },
    ]

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) },
        },
    }

    return (
        <section className="space-y-4 sm:space-y-6 md:space-y-8 py-3 sm:py-6 px-3 sm:px-6">
            {/* 標題區塊 */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-3"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-200/30 dark:border-blue-800/30">
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        核心功能
                    </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 leading-tight px-4">
                    {/* 手機版: 垂直排列 */}
                    <span className="block sm:hidden">
                        探索
                        <span className="block mt-2 relative">
                            {mounted ? (
                                <Highlighter action="highlight" color="#faf560ff">
                                    OneLink
                                </Highlighter>
                            ) : (
                                <span className="invisible">OneLink</span>
                            )}
                        </span>
                        <span className="block mt-2">生態系統</span>
                    </span>

                    {/* 平板版: 適度換行 */}
                    <span className="hidden sm:block md:hidden">
                        探索{" "}
                        <span className="inline-block relative align-baseline">
                            {mounted ? (
                                <Highlighter action="highlight" color="#faf560ff">
                                    OneLink
                                </Highlighter>
                            ) : (
                                <span className="invisible">OneLink</span>
                            )}
                        </span>
                        <br />
                        生態系統
                    </span>

                    {/* 桌面版: 單行顯示 */}
                    <span className="hidden md:inline">
                        探索{" "}
                        <span className="inline-block relative align-baseline">
                            {mounted ? (
                                <Highlighter action="highlight" color="#faf560ff">
                                    OneLink
                                </Highlighter>
                            ) : (
                                <span className="invisible">OneLink</span>
                            )}
                        </span>{" "}
                        生態系統
                    </span>
                </h2>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
                    從 AI 對話到社群共創，體驗完整的智慧工作流程
                </p>
            </motion.div>

            {/* Bento Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
            >
                <BentoGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-2 sm:gap-3 lg:gap-4">
                    {features.map((feature) => {
                        const { Icon, iconClass, iconBg, badge, badgeColor, ...rest } = feature
                        return (
                            <motion.div
                                key={feature.name}
                                variants={itemVariants}
                                className=""
                            >
                                <BentoCard
                                    Icon={() => (
                                        <div className="relative min-h-[150px]">
                                            <div
                                                className={`p-2 sm:p-3 rounded-xl ${iconBg} backdrop-blur-sm transition-all duration-300`}
                                            >
                                                <Icon
                                                    className={`h-6 w-6 ${iconClass} text-transparent bg-clip-text transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                                                    strokeWidth={2}
                                                />
                                            </div>
                                            {badge && (
                                                <div
                                                    className={`absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium border ${badgeColor} backdrop-blur-sm`}
                                                >
                                                    {badge}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {...rest}
                                />
                            </motion.div>
                        )
                    })}
                </BentoGrid>
            </motion.div>

            {/* 底部裝飾 */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400"
            >
                <Zap className="w-4 h-4 text-blue-500" />
                <span>持續進化中，更多功能即將解鎖</span>
            </motion.div>
        </section>
    )
}