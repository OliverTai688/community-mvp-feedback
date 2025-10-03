import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SpinAIPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <section>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">SpinAI 工具介紹</h1>
        <p className="mt-2 text-muted-foreground">
          SpinAI 是一款智慧助理工具，能幫助你模擬銷售對話、提升溝通效率，並即時獲得建議。  
          在這裡，你可以了解功能並前往體驗版本。
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>主要功能</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <ul className="list-disc list-inside space-y-1">
            <li>模擬業務對話，幫助銷售訓練</li>
            <li>依據 SPIN 四階段提出精準問題</li>
            <li>自動總結並提供改善建議</li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button asChild>
          <Link href="https://your-spinai-demo.com" target="_blank">
            前往體驗 SpinAI Demo
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">返回首頁</Link>
        </Button>
      </div>
    </div>
  )
}
