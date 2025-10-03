import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CommunityPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-xl font-semibold tracking-tight">社群</h1>
      <Card>
        <CardHeader><CardTitle>加入我們的社群</CardTitle></CardHeader>
        <CardContent className="space-x-3">
          <Button asChild variant="default"><Link href="https://example.com/discord" target="_blank">Discord</Link></Button>
          <Button asChild variant="outline"><Link href="https://example.com/line" target="_blank">LINE 社群</Link></Button>
          <Button asChild variant="outline"><Link href="https://example.com/slack" target="_blank">Slack</Link></Button>
        </CardContent>
      </Card>
    </div>
  )
}
