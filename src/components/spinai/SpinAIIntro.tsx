"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Clock, ArrowRight, Zap, Target, Brain } from "lucide-react"
import Image from "next/image"

export function SpinAIIntro() {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 7)
    const [_, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

    useEffect(() => {
        const target = new Date()
        target.setDate(target.getDate() + 7)

        const timer = setInterval(() => {
            const diff = target.getTime() - new Date().getTime()
            if (diff <= 0) {
                setRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 })
                clearInterval(timer)
                return
            }
            setRemaining({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
            {/* 背景裝飾 */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
                <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-10 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <motion.section
                    className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="max-w-6xl mx-auto w-full">
                        <motion.div
                            className="text-center space-y-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div variants={itemVariants} className="space-y-4">
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 leading-tight">
                                    誠問 AI
                                </h1>
                                <p className="text-xl sm:text-2xl text-gray-700 font-light">
                                    用對的問題，打開客戶的心
                                </p>
                            </motion.div>

                            <motion.p
                                variants={itemVariants}
                                className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
                            >
                                在每一場顧問對談中，我們都知道——<span className="text-blue-600 font-semibold">提問的力量，往往比答案更重要</span>。
                                誠問 AI 不只是銷售工具，而是一位幫你引導對話、建立信任的智慧夥伴。
                            </motion.p>

                            <motion.div variants={itemVariants} className="pt-4">
                                <a
                                    href="#features"
                                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-200"
                                >
                                    了解更多 <ArrowRight className="w-5 h-5" />
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Features Section */}
                <motion.section
                    id="features"
                    className="py-20 px-4 sm:px-6 lg:px-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            className="text-center mb-16"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">三大核心應用</h2>
                            <p className="text-gray-600 text-lg">提問、規劃、管理的智慧循環</p>
                        </motion.div>

                        <motion.div
                            className="grid md:grid-cols-3 gap-6 lg:gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {/* Card 1 */}
                            <motion.div
                                variants={itemVariants}
                                className="group relative"
                                whileHover={{ y: -4 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-purple-200/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative bg-white border-2 border-blue-100 group-hover:border-blue-300 rounded-2xl p-8 h-full transition-all duration-300 shadow-sm hover:shadow-md">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-blue-100 rounded-lg">
                                            <Brain className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">SPIN 智能提問框架</h3>
                                    </div>
                                    <p className="text-gray-700 mb-4 leading-relaxed">
                                        內建情境（S）、問題（P）、影響（I）、需求效益（N）四大類問句，幫助你層層引導客戶。
                                    </p>
                                    <p className="text-gray-600 text-sm mb-4">
                                        從背景 → 問題 → 風險 → 解方
                                    </p>
                                    <div className="pt-4 border-t border-gray-200">
                                        <p className="text-blue-600 font-semibold text-sm">核心價值：理解與連結</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card 2 */}
                            <motion.div
                                variants={itemVariants}
                                className="group relative"
                                whileHover={{ y: -4 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 to-blue-200/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative bg-white border-2 border-purple-100 group-hover:border-purple-300 rounded-2xl p-8 h-full transition-all duration-300 shadow-sm hover:shadow-md">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-purple-100 rounded-lg">
                                            <Target className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">專案式對話與客戶管理</h3>
                                    </div>
                                    <p className="text-gray-700 mb-4 leading-relaxed">
                                        在複雜的傳承案件裡，提供可視化、可追蹤、可控管的專案式管理系統。
                                    </p>
                                    <ul className="text-gray-600 text-sm space-y-2 mb-4">
                                        <li>• 整合會議記錄與進度檢視</li>
                                        <li>• 建立家庭結構圖與決策權重</li>
                                        <li>• 掌握案件進展與關係人互動</li>
                                    </ul>
                                    <div className="pt-4 border-t border-gray-200">
                                        <p className="text-purple-600 font-semibold text-sm">核心價值：清晰與信任</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card 3 */}
                            <motion.div
                                variants={itemVariants}
                                className="group relative"
                                whileHover={{ y: -4 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-purple-200/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative bg-white border-2 border-blue-100 group-hover:border-purple-300 rounded-2xl p-8 h-full transition-all duration-300 shadow-sm hover:shadow-md">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-blue-100 rounded-lg">
                                            <Zap className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">AI × 專業規劃助理</h3>
                                    </div>
                                    <p className="text-gray-700 mb-4 leading-relaxed">
                                        AI 模組協助快速整理客戶背景、生成提問劇本、會前智能規劃。
                                    </p>
                                    <ul className="text-gray-600 text-sm space-y-2 mb-4">
                                        <li>• 智能規劃與快速整合分析</li>
                                        <li>• AI 對話總結與關鍵洞察</li>
                                        <li>• 劇本式對練，提前模擬回應</li>
                                    </ul>
                                    <div className="pt-4 border-t border-gray-200">
                                        <p className="text-blue-600 font-semibold text-sm">核心價值：洞察與專業</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Benefits Section */}
                <motion.section
                    className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <h2 className="text-4xl font-bold text-gray-900">為什麼選擇誠問 AI</h2>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <span className="text-blue-600 font-bold">✓</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">提高成約率</h3>
                                            <p className="text-gray-600">用對的問題引導，讓客戶主動表達需求</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <span className="text-purple-600 font-bold">✓</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">節省準備時間</h3>
                                            <p className="text-gray-600">AI 快速整理分析，讓你更有信心進場</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <span className="text-blue-600 font-bold">✓</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">強化客戶關係</h3>
                                            <p className="text-gray-600">建立信任，將一次交易轉為長期合作</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                           <motion.div
  initial={{ opacity: 0, x: 40 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="relative"
>
  <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl overflow-hidden h-72 flex items-center justify-center">
    <Image
  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2340"
  alt="AI Example"
  width={997}   // ← 建議填上實際圖片寬度
  height={664}  // ← 建議填上實際高度比例 (約 3:2 或你想要的比例)
  className="object-cover w-full h-full"
/>
  </div>
</motion.div>

                        </div>
                    </div>
                </motion.section>

                {/* Testimonials Section */}
                {/* 替換這整段 cards 區塊 */}
<div className="grid md:grid-cols-3 gap-6">
  {[
    {
      quote: "誠問AI讓對話變簡單，客戶願意說出真正的需求跟想法",
      name: "保險小姐姐",
      org: "OO人壽",
    },
    {
      quote:
        "我是新人，原本很怕每次見客戶不知道怎麼問問題跟聊天，有了誠問，現在出門都很有底氣。",
      name: "黃小美",
      org: "OO保經",
    },
    {
      quote: "誠問幫我全方位設想好問句，讓提問更容易了。",
      name: "小宇襄理",
      org: "OO人壽",
    },
  ].map((t, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: (i + 1) * 0.1 }}
      viewport={{ once: true }}
      className="flex flex-col justify-between h-full bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-200 transition-all duration-300 hover:shadow-lg"
    >
      {/* ⭐ 評分與回饋內容 */}
      <div>
        <div className="flex gap-1 mb-4" aria-label="5-star rating">
          {Array.from({ length: 5 }).map((_, j) => (
            <span key={j} className="text-blue-500 text-lg leading-none">★</span>
          ))}
        </div>
        <p className="text-gray-700 text-base mb-6 leading-relaxed italic">
          “{t.quote}”
        </p>
      </div>

      {/* 👤 使用者資訊區固定底部 */}
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full shrink-0" />
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-900">{t.org}</p>
          <p className="text-xs text-gray-500">{t.name}</p>
        </div>
      </div>
    </motion.div>
  ))}
</div>



                {/* CTA Section */}
                <motion.section
                    className="py-20 px-4 sm:px-6 lg:px-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="max-w-4xl mx-auto">
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                            <motion.div
                                className="relative z-10 text-center space-y-8"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <motion.div variants={itemVariants} className="space-y-3">
                                    <h2 className="text-4xl sm:text-5xl font-bold text-white">
                                        準備好開始了嗎？
                                    </h2>
                                    <p className="text-blue-100 text-lg">
                                        立即體驗誠問 AI，讓提問成為你最強的銷售武器
                                    </p>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                                >
                                    <a
                                        href="https://tally.so/r/wQ6aqg"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-xl flex items-center gap-2 group"
                                    >
                                        <Clock className="w-5 h-5" />
                                        前往填寫 誠問AI Demo 早鳥表單
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </motion.div>

                                {/* <motion.div variants={itemVariants}>
                                    <div className="inline-flex items-center gap-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-8 py-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-white" />
                                            <span className="text-white font-medium">體驗倒數</span>
                                        </div>
                                        <div className="flex gap-3 text-center">
                                            <div className="bg-white/10 rounded-lg px-3 py-2 min-w-fit border border-white/20">
                                                <div className="text-2xl font-bold text-white">{remaining.days}</div>
                                                <div className="text-xs text-blue-100">天</div>
                                            </div>
                                            <div className="bg-white/10 rounded-lg px-3 py-2 min-w-fit border border-white/20">
                                                <div className="text-2xl font-bold text-white">{remaining.hours}</div>
                                                <div className="text-xs text-blue-100">小時</div>
                                            </div>
                                            <div className="bg-white/10 rounded-lg px-3 py-2 min-w-fit border border-white/20">
                                                <div className="text-2xl font-bold text-white">{remaining.minutes}</div>
                                                <div className="text-xs text-blue-100">分</div>
                                            </div>
                                            <div className="bg-white/10 rounded-lg px-3 py-2 min-w-fit border border-white/20">
                                                <div className="text-2xl font-bold text-white">{remaining.seconds}</div>
                                                <div className="text-xs text-blue-100">秒</div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div> */}

                                <motion.p variants={itemVariants} className="text-blue-100 text-sm pt-4">
                                    — OneLink
                                </motion.p>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* Footer */}
                <footer className="border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
                        <p>© 2025 誠問AI - OneLink。保留所有權利。</p>
                    </div>
                </footer>
            </div>
        </div>
    )
}