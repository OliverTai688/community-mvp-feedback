"use client"

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { MessageCircle } from "lucide-react"

export function FAQSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 space-y-6 text-slate-800 dark:text-slate-200">
      {/* 標題區塊 */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-400">
          <MessageCircle className="w-4 h-4" />
          誠問AI × SPIN FAQ
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold">用對的問題，打開客戶的心。</h2>
      </div>

      {/* FAQ 區塊 */}
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-3">
          <AccordionItem value="item-1">
            <AccordionTrigger>誠問AI是什麼？</AccordionTrigger>
            <AccordionContent>
              誠問AI是一套結合 <strong>SPIN 顧問式銷售邏輯</strong> 與 <strong>AI 智能對話引導</strong> 的提問系統。
              它幫助保險顧問、財富規劃師、企業顧問，用對的問題打開客戶的心，
              讓你在每一場對談中更快找到關鍵需求、提高成交率。
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>誠問AI能幫我做什麼？</AccordionTrigger>
            <AccordionContent>
              誠問AI讓顧問思考更有邏輯，成交更有溫度。它能協助你：
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>自動生成符合不同客戶情境的 SPIN 問句</li>
                <li>模擬顧問對談，幫你練習提問與回應</li>
                <li>整理對話紀錄、快速生成會議摘要</li>
                <li>結合 CRM 客戶管理模組，追蹤案件進度</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>跟一般 AI 或 CRM 有什麼不同？</AccordionTrigger>
            <AccordionContent>
              一般 AI 「回答問題」，誠問AI「幫你問問題」。
              它是一位思考型教練，能根據客戶背景自動生成顧問式問句，
              並在對話中即時引導你用 SPIN 邏輯完成提問。
              CRM 記錄資料，誠問AI讓對話變成交。
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>使用誠問AI需要具備什麼？</AccordionTrigger>
            <AccordionContent>
              只需要一台手機或電腦即可登入使用。
              若先建立「客戶家庭結構圖」與「案件資料」及客戶想解決的痛點，
              系統會根據背景自動生成客製化問句與對話模擬。
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>我的資料安全嗎？</AccordionTrigger>
            <AccordionContent>
              是的。誠問AI採用 <strong>AWS 資安防護等級</strong>，
              所有客戶資料均經加密處理，不作行銷用途、不對外分享，
              確保每一場對話與案件進度都在安全環境中進行。
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>適合哪些使用者？</AccordionTrigger>
            <AccordionContent>
              誠問AI特別為顧問式銷售而生，適合：
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>保險業務員、財富規劃師、信託顧問</li>
                <li>企業主與家族辦公室顧問團</li>
                <li>想提升顧問式銷售力的業務主管</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>系統費用與版本差異？</AccordionTrigger>
            <AccordionContent>
              目前提供二種版本：
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li><strong>體驗版（Beta）</strong>：免費試用核心提問模組</li>
                <li><strong>顧問版</strong>：整合案件追蹤＋AI提問＋腳本生成</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>系統會持續更新嗎？</AccordionTrigger>
            <AccordionContent>
              會的。誠問AI會持續進化。
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
