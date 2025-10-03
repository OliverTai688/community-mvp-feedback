"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function FeedbackPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<null | boolean>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, message, page: "/feedback" }),
    })
    setOk(res.ok)
    setLoading(false)
    if (res.ok) {
      setEmail("")
      setMessage("")
      router.refresh()
    }
  }

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">回饋</h1>
        <p className="text-sm text-muted-foreground">留下你的想法（Email 選填）。</p>
      </div>
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email（選填）</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">訊息</Label>
          <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={6} required />
        </div>
        <Button type="submit" disabled={loading}>{loading ? "送出中..." : "送出"}</Button>
        {ok === true && <p className="text-xs text-green-600">已送出，感謝你的回饋！</p>}
        {ok === false && <p className="text-xs text-red-600">送出失敗，請稍後再試。</p>}
      </form>
    </div>
  )
}
