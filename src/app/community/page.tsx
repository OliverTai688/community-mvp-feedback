"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-indigo-50 to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, rotateY: -10 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ rotateY: 10, scale: 1.05 }}
        className="relative group [transform-style:preserve-3d] cursor-pointer"
      >
        <Card className="w-[340px] h-[420px] bg-white rounded-3xl shadow-xl border border-indigo-100 overflow-hidden">
          <CardContent className="relative z-10 flex flex-col justify-center items-center h-full text-center p-8 space-y-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white shadow-lg"
            >
              <MessageCircle className="w-10 h-10" />
            </motion.div>

            <motion.h2
              className="text-2xl font-extrabold text-gray-900"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              加入誠交 LINE 社群
            </motion.h2>

            <motion.p
              className="text-gray-600 leading-relaxed text-base"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              一起學習誠的力量，<br />
              與專業顧問共同成長。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Link
                href="https://example.com/line"
                target="_blank"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                立即加入
              </Link>
            </motion.div>
          </CardContent>

          {/* 背景光影層 */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-green-100 via-white to-indigo-100 opacity-60 group-hover:opacity-80 transition-opacity duration-500"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* 光暈環繞效果 */}
          <div className="absolute inset-0 rounded-3xl border border-white/40 shadow-[0_0_40px_rgba(99,102,241,0.15)] group-hover:shadow-[0_0_60px_rgba(99,102,241,0.25)] transition-all duration-500" />
        </Card>
      </motion.div>
    </div>
  )
}
