"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SpinAIIntro } from "@/components/spinai/SpinAIIntro"

export default function SpinAIPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-6xl space-y-8">
        {/* 引用介紹元件 */}
        <SpinAIIntro />

        {/* 按鈕區塊 */}
        
      </div>
    </main>
  )
}
