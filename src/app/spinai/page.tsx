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
        <div className="flex justify-center gap-3 pt-8">
          <Button asChild>
            <Link href="https://your-spinai-demo.com" target="_blank">
              前往體驗 誠問AI Demo
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">返回首頁</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
