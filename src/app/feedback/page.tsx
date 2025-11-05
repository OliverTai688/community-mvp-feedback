"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { LightRays } from "@/components/ui/light-rays"
import Image from "next/image"

export default function FeedbackPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<null | boolean>(null)
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({})

  const messageRef = useRef<HTMLTextAreaElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  const MAX_MESSAGE_LENGTH = 1000
  const MIN_MESSAGE_LENGTH = 10

  useEffect(() => {
    if (ok === true) {
      const timer = setTimeout(() => setOk(null), 5000)
      successRef.current?.focus()
      return () => clearTimeout(timer)
    }
  }, [ok])

  const validateForm = (): boolean => {
    const newErrors: { email?: string; message?: string } = {}
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "請輸入有效的 Email 格式"
    }
    if (!message.trim()) {
      newErrors.message = "請輸入訊息內容"
    } else if (message.trim().length < MIN_MESSAGE_LENGTH) {
      newErrors.message = `訊息長度至少需要 ${MIN_MESSAGE_LENGTH} 個字元`
    } else if (message.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `訊息長度不能超過 ${MAX_MESSAGE_LENGTH} 個字元`
    }
    setErrors(newErrors)
    if (newErrors.email) emailRef.current?.focus()
    else if (newErrors.message) messageRef.current?.focus()
    return Object.keys(newErrors).length === 0
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)
    setOk(null)
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message, page: "/feedback" }),
      })
      setOk(res.ok)
      if (res.ok) {
        setEmail("")
        setMessage("")
        setErrors({})
        router.refresh()
      }
    } catch (_error) {
      setOk(false)
    } finally {
      setLoading(false)
    }
  }

  const messageLength = message.length
  const isMessageTooLong = messageLength > MAX_MESSAGE_LENGTH

  return (
    <div className="">
      {/* 💡 背景 Light Rays 特效層 */}
      <LightRays className="absolute inset-0 -z-10 opacity-70" />

      {/* 🖼️ 頁面內容 */}
      <div className="relative max-w-xl   mx-auto px-4 py-12 space-y-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 p-6">
        {/* Header Image */}
        <div className="w-full overflow-hidden rounded-2xl shadow-md shadow-indigo-100">
          <Image
            src="https://images.unsplash.com/photo-1487611459768-bd414656ea10?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2340"
            alt="Feedback illustration - people collaborating"
            width={997}
            height={712}
            className="w-full h-48 object-cover object-center transition-transform duration-500 hover:scale-105 rounded-2xl shadow-md shadow-indigo-100"
          />

        </div>

        {/* Title */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            回饋意見
          </h1>
          <p className="text-sm text-muted-foreground">
            留下你的想法，幫助我們改進服務。Email 為選填欄位。
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-6" noValidate>
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email（選填）
            </Label>
            <Input
              ref={emailRef}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={loading}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-red-600 flex items-center gap-1" role="alert">
                <span aria-hidden="true">⚠</span>
                {errors.email}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="message" className="text-sm font-medium">
                訊息 <span className="text-red-500" aria-label="必填">*</span>
              </Label>
              <span
                className={`text-xs ${isMessageTooLong ? "text-red-600 font-medium" : "text-muted-foreground"}`}
                aria-live="polite"
              >
                {messageLength} / {MAX_MESSAGE_LENGTH}
              </span>
            </div>
            <Textarea
              ref={messageRef}
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              placeholder="請分享你的想法或建議..."
              disabled={loading}
              required
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : "message-hint"}
              className={errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.message ? (
              <p id="message-error" className="text-xs text-red-600 flex items-center gap-1" role="alert">
                <span aria-hidden="true">⚠</span>
                {errors.message}
              </p>
            ) : (
              <p id="message-hint" className="text-xs text-muted-foreground">
                請輸入至少 {MIN_MESSAGE_LENGTH} 個字元
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="space-y-3">
            <Button
              type="submit"
              disabled={loading || isMessageTooLong}
              aria-busy={loading}
              className={`relative w-full sm:w-auto min-w-[140px] 
                overflow-hidden rounded-xl 
                bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 
                text-white shadow-lg 
                transition-all duration-500 
                hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]
                hover:scale-[1.03]
                focus-visible:ring-2 focus-visible:ring-indigo-300
                ${loading ? "opacity-70 cursor-not-allowed" : ""}
              `}
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" aria-hidden="true" />
                    送出中...
                  </>
                ) : (
                  "✨ 送出回饋"
                )}
              </span>
              <div className="absolute inset-0 -z-0 animate-[shine_3s_linear_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 hover:opacity-50" />
            </Button>

            {/* Success Message */}
            {ok === true && (
              <div
                ref={successRef}
                tabIndex={-1}
                className="rounded-lg border border-green-200 bg-green-50 p-3 animate-in fade-in slide-in-from-top-2 duration-300"
                role="status"
                aria-live="polite"
              >
                <p className="text-sm text-green-800 flex items-center gap-2">
                  <span className="text-lg" aria-hidden="true">✓</span>
                  <span className="font-medium">已成功送出，感謝你的回饋！</span>
                </p>
              </div>
            )}

            {/* Error Message */}
            {ok === false && (
              <div
                className="rounded-lg border border-red-200 bg-red-50 p-3 animate-in fade-in slide-in-from-top-2 duration-300"
                role="alert"
                aria-live="assertive"
              >
                <p className="text-sm text-red-800 flex items-center gap-2">
                  <span className="text-lg" aria-hidden="true">✕</span>
                  <span>送出失敗，請稍後再試或聯繫客服。</span>
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
