"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Users, TrendingUp, Heart, Lightbulb, Target, RotateCw } from "lucide-react"
import { easeOut, cubicBezier } from "motion"
import { useState } from "react"

export default function AboutPage() {
  const [flipped, setFlipped] = useState<{ cheng: boolean; jiao: boolean }>({
    cheng: false,
    jiao: false,
  })

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: easeOut } // ✅ 使用函式，不是字串或陣列
  }

  // 淡入
  const fadeIn = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.8, ease: easeOut }, // ✅ 使用 easing 函式
  }

  // 向左滑入
  const slideInLeft = {
    initial: { opacity: 0, x: -60 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, ease: cubicBezier(0.42, 0, 0.58, 1) }, // ✅ easeInOut
  }

  // 向右滑入
  const slideInRight = {
    initial: { opacity: 0, x: 60 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, ease: cubicBezier(0.42, 0, 0.58, 1) },
  }

  // 子元素延遲進場
  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.2,
        ease: easeOut, // ✅ 可加 easing，避免 TS 報型別錯
      },
    },
    viewport: { once: true, amount: 0.2 },
  }

  return (
    <div className="relative">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-white" />

      {/* Animated Background Shapes */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-indigo-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 space-y-32">
        {/* Hero Section */}
        <section className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge className="mb-4 px-6 py-2 text-sm bg-gradient-to-r from-indigo-500 to-purple-500 border-0">
                <Sparkles className="w-4 h-4 mr-2" />
                About Us
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold tracking-tight"
            >
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                誠交俱樂部
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl md:text-3xl text-gray-700 font-medium"
            >
              讓專業被看見，讓努力有價值
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="max-w-3xl mx-auto space-y-4 text-lg text-gray-600 leading-relaxed"
            >
              <p>
                在這個資訊爆炸、競爭激烈的時代，許多保險顧問每天都在努力。<br />
                努力學課程、努力約訪、努力成交。
              </p>
              <p className="text-xl font-medium text-gray-800">
                但努力，不一定會被看見。
              </p>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          
        </section>

        {/* Mission Statement */}
        <motion.section {...fadeInUp} className="max-w-4xl mx-auto">
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8 md:p-12 space-y-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                我們希望讓<span className="font-bold text-indigo-600">「真誠」</span>重新被看見，
                讓<span className="font-bold text-purple-600">「顧問」</span>不只是銷售商品的人，
                而是能夠被信任、被選擇、被尊重的專業角色。
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Vision Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...slideInLeft} className="space-y-6">
            <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">
              <Target className="w-4 h-4 mr-2" />
              Vision 願景
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              顧問轉型的
              <span className="text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
                最佳夥伴
              </span>
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                誠交的存在，不是為了讓你賣出更多商品，而是讓你成為<span className="font-semibold text-indigo-600">「值得被選擇」</span>的那一位顧問。
              </p>
              <p>
                在這裡，我們相信專業不應該孤單。你不再是一個人面對客戶，
                而是有律師、有地政士、有團隊陪你一起出場。
              </p>
              <Card className="border-l-4 border-l-indigo-500 bg-indigo-50/50">
                <CardContent className="p-6">
                  <p className="font-medium text-indigo-900">
                    你的努力，會被看到；你的專業，會被尊重。
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div
            {...slideInRight}
            className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987"
              alt="Collaboration and success"
              fill
              className="object-cover"
            />
          </motion.div>
        </section>

        {/* Four Pillars */}
        <motion.section {...staggerContainer} className="space-y-16 py-20 bg-transparant">
  {/* 區塊標題區 */}
  <motion.div {...fadeInUp} className="text-center space-y-4">
    <Badge className="bg-purple-100 text-purple-700 border-purple-200">
      <Lightbulb className="w-4 h-4 mr-2" />
      Mission 使命
    </Badge>
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
      四大核心板塊
    </h2>
    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
      陪伴顧問升級，建立信任，擴大影響力
    </p>
    <div className="mx-auto w-20 h-1 mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full" />
  </motion.div>

  {/* 四大核心卡片 */}
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-8 lg:px-16">
    {[
      {
        icon: Sparkles,
        title: "品牌力",
        description: "建立個人品牌，讓客戶記住你",
        color: "from-blue-500 to-indigo-500",
        glow: "shadow-[0_0_25px_rgba(59,130,246,0.25)]",
      },
      {
        icon: TrendingUp,
        title: "銷售力",
        description: "提升成交技巧，創造價值交換",
        color: "from-indigo-500 to-purple-500",
        glow: "shadow-[0_0_25px_rgba(99,102,241,0.25)]",
      },
      {
        icon: Users,
        title: "經營力",
        description: "長期關係維護，深化客戶信任",
        color: "from-purple-500 to-pink-500",
        glow: "shadow-[0_0_25px_rgba(168,85,247,0.25)]",
      },
      {
        icon: Target,
        title: "媒體力",
        description: "內容行銷策略，擴大影響範圍",
        color: "from-pink-500 to-red-500",
        glow: "shadow-[0_0_25px_rgba(236,72,153,0.25)]",
      },
    ].map((pillar, index) => (
      <motion.div
        key={pillar.title}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        whileHover={{ scale: 1.05, y: -6 }}
      >
        <Card
          className={`relative h-full border-0 bg-white/90 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 ${pillar.glow}`}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 to-transparent" />

          <CardContent className="relative p-8 space-y-5">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${pillar.color} rounded-2xl text-white shadow-md`}
            >
              <pillar.icon className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900">{pillar.title}</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              {pillar.description}
            </p>

            {/* 裝飾漸層條 */}
            <div
              className={`h-[3px] w-1/3 bg-gradient-to-r ${pillar.color} rounded-full mt-4`}
            />
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </div>
</motion.section>


        {/* Values Section */}
        <section className="flex flex-col items-center gap-16 py-20 bg-transparant px-4">
          {/* 標題與說明文字 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full border border-indigo-200">
              <Heart className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-700">我們的價值觀</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-gray-900">
              誠<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">與</span>交的精神
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              誠，是信任的基礎；交，是關係的延伸。<br />
              我們相信：真誠的交流，才會帶來長久的信任。
            </p>
          </motion.div>

          {/* 卡片容器 */}
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl w-full">

            {/* 誠卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative w-full aspect-[4/3] cursor-pointer [perspective:1000px] group"
              onClick={() => setFlipped((p) => ({ ...p, cheng: !p.cheng }))}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl [transform-style:preserve-3d] transition-all duration-300 group-hover:shadow-2xl"
                animate={{ rotateY: flipped.cheng ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  boxShadow: '0 10px 30px rgba(79, 70, 229, 0.1)',
                }}
              >
                {/* 正面 - 極簡白色設計 */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 bg-white rounded-2xl backface-hidden border border-gray-100">
                  <div className="w-16 h-16 flex items-center justify-center mb-6 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50">
                    <div className="text-4xl font-black text-indigo-600">誠</div>
                  </div>

                  <p className="text-gray-700 text-base leading-relaxed font-medium mb-8 max-w-xs">
                    代表真實與誠意。<br />
                    誠懇比技巧更有力量。
                  </p>

                  {/* 翻轉提示 */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex items-center gap-2 text-indigo-600 text-xs font-semibold uppercase tracking-wider"
                  >
                    <RotateCw className="w-3 h-3" />
                    點擊翻面
                  </motion.div>
                </div>

                {/* 背面 - 簡約色彩 */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700 rounded-2xl [transform:rotateY(180deg)] backface-hidden border border-indigo-400">
                  <h3 className="text-2xl font-black text-white mb-3">誠的力量</h3>
                  <p className="text-indigo-100 text-base leading-relaxed font-medium">
                    誠是信任的基礎，<br />
                    也是專業的靈魂。<br />
                    <span className="block text-indigo-200 text-sm mt-2">讓每一次交流都變得有溫度。</span>
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* 交卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full aspect-[4/3] cursor-pointer [perspective:1000px] group"
              onClick={() => setFlipped((p) => ({ ...p, jiao: !p.jiao }))}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl [transform-style:preserve-3d] transition-all duration-300 group-hover:shadow-2xl"
                animate={{ rotateY: flipped.jiao ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  boxShadow: '0 10px 30px rgba(147, 51, 234, 0.1)',
                }}
              >
                {/* 正面 - 極簡白色設計 */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 bg-white rounded-2xl backface-hidden border border-gray-100">
                  <div className="w-16 h-16 flex items-center justify-center mb-6 rounded-full bg-gradient-to-br from-purple-100 to-purple-50">
                    <div className="text-4xl font-black text-purple-600">交</div>
                  </div>

                  <p className="text-gray-700 text-base leading-relaxed font-medium mb-8 max-w-xs">
                    代表交流與連結。<br />
                    關係是價值的延伸。
                  </p>

                  {/* 翻轉提示 */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex items-center gap-2 text-purple-600 text-xs font-semibold uppercase tracking-wider"
                  >
                    <RotateCw className="w-3 h-3" />
                    點擊翻面
                  </motion.div>
                </div>

                {/* 背面 - 簡約色彩 */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-2xl [transform:rotateY(180deg)] backface-hidden border border-purple-400">
                  <h3 className="text-2xl font-black text-white mb-3">交的連結</h3>
                  <p className="text-purple-100 text-base leading-relaxed font-medium">
                    真誠的交流，<br />
                    讓價值成為長久的信任。<br />
                    <span className="block text-purple-200 text-sm mt-2">建立深層的人心連接。</span>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>


        {/* Origin Story */}
        <motion.section {...fadeInUp} className="space-y-12">
          <div className="text-center space-y-4">
            <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">
              <Sparkles className="w-4 h-4 mr-2" />
              Origin 緣起
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              我們的起點
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=1200",
                title: "看見需求",
                description: "許多專業顧問只是缺少被看見的舞台"
              },
              {
                image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200",
                title: "整合資源",
                description: "律師、地政士、資產顧問，成為你的後盾"
              },
              {
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200",
                title: "共同成長",
                description: "講座、Podcast、實戰課程，讓故事被聽見"
              }
            ].map((story, index) => (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <Card className="border-0 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {/* <div className="relative aspect-video">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover"
                    />
                  </div> */}
                  <CardContent className="p-6 space-y-2">
                    <h3 className="text-xl font-bold text-blue-900">{story.title}</h3>
                    <p className="text-gray-600">{story.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeIn} className="max-w-4xl mx-auto space-y-6 text-center">
            <p className="text-xl text-gray-700 leading-relaxed">
              能不能讓這群專業又真誠的顧問，有一個地方能一起學習、一起被看見、一起成長？
            </p>
            <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
              就這樣，誠交誕生了。
            </p>
          </motion.div>
        </motion.section>

        {/* Closing Statement */}
        <motion.section
          {...fadeInUp}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800" />
          <div className="absolute inset-0 bg-grid-white/10" />

          <div className="relative px-8 py-16 md:py-24 text-center space-y-8 bg-white text-gray-800">
            {/* 發光圖示區 */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mx-auto shadow-[0_0_20px_rgba(147,51,234,0.15)]"
            >
              <Sparkles className="w-10 h-10 text-indigo-500" />
            </motion.div>

            {/* 主標題 */}
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-left pl-[5%]">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent">
                讓專業被看見
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 bg-clip-text text-transparent">
                讓努力有價值
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent">
                讓你成為那個值得被選擇的顧問
              </span>
            </h2>


            {/* 副標說明 */}
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-left">
              誠交俱樂部相信，每一位顧問都能用一杯咖啡的溫度、一次提問的洞察、一次相遇的誠意，
              重新定義成交這件事。
            </p>


            {/* 徽章動畫 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition">
                誠交俱樂部 2025
              </Badge>
            </motion.div>
          </div>

        </motion.section>
      </div>
    </div>
  )
}