"use client"

import { useState, useEffect, Key, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function EditorPreview({
    initialData,
    isEditing = false,
}: {
    initialData?: any
    isEditing?: boolean
}) {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [form, setForm] = useState({
        token: "",
        title: initialData?.title || "",
        content: initialData?.content || "",
        tags: initialData?.tags?.join(", ") || "",
        coverUrl: initialData?.coverUrl || "",
        images: initialData?.images?.join("\n") || "",
    })
    const [now, setNow] = useState<string>("")

    useEffect(() => {
        setNow(new Date().toLocaleString("zh-TW"))
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSubmitting(true)
        try {
            const res = await fetch(
                isEditing ? `/api/changelog/${initialData.id}` : "/api/changelog/new",
                {
                    method: isEditing ? "PUT" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                }
            )
            const json = await res.json()
            if (!res.ok) throw new Error(json?.error || `HTTP ${res.status}`)
            router.push(`/changelog/${json.id || initialData.id}`)
        } catch (err) {
            setError(err instanceof Error ? err.message : "儲存失敗")
        } finally {
            setSubmitting(false)
        }
    }

    const tagList = form.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
    const imageList = form.images.split("\n").map((s: string) => s.trim()).filter(Boolean)

    return (
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
            {/* 左邊表單 */}
            <div>
                <Card className="border-slate-200 dark:border-slate-800 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            新增更新日誌
                        </CardTitle>
                        <CardDescription>輸入資訊，右側即時預覽</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-2">
                        <form onSubmit={onSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="token">管理密碼</Label>
                                <Input id="token" name="token" type="password" required value={form.token} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="title">標題</Label>
                                <Input id="title" name="title" required value={form.title} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="content">內容 (支援 Markdown)</Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    rows={8}
                                    required
                                    value={form.content}
                                    onChange={handleChange}
                                    placeholder="## 新功能\n- 支援 Markdown 格式"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tags">標籤（用逗號分隔）</Label>
                                <Input id="tags" name="tags" value={form.tags} onChange={handleChange} placeholder="release, ui, feature" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="coverUrl">封面圖片 URL</Label>
                                <Input id="coverUrl" name="coverUrl" type="url" value={form.coverUrl} onChange={handleChange} placeholder="https://example.com/cover.jpg" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="images">相關圖片 (每行一個 URL)</Label>
                                <Textarea
                                    id="images"
                                    name="images"
                                    rows={4}
                                    value={form.images}
                                    onChange={handleChange}
                                    placeholder="https://example.com/1.jpg\nhttps://example.com/2.jpg"
                                />
                            </div>

                            {error && <p className="text-sm text-red-600">錯誤：{error}</p>}

                            <Button type="submit" disabled={submitting} className="w-full">
                                <Sparkles className="w-4 h-4 mr-2" />
                                {submitting ? "儲存中…" : isEditing ? "更新內容" : "發布更新"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* 右邊預覽 */}
            <div>
                <Card className="border-slate-200 dark:border-slate-800 shadow-lg bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            {form.title || "預覽標題"}
                        </CardTitle>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{now}</p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {form.coverUrl && (
                            <img src={form.coverUrl} alt="封面圖" className="w-full rounded-lg object-cover" />
                        )}

                        <div
                            className="prose dark:prose-invert max-w-none leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html:
                                    form.content?.trim() ||
                                    "<p class='text-slate-400'>這裡會即時顯示 HTML / Markdown 內容。</p>",
                            }}
                        />

                        {imageList.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {imageList.map((url: string | Blob | undefined, idx: Key | null | undefined) => (
                                    <img key={idx} src={url} alt={`img-${idx}`} className="rounded-md w-full h-32 object-cover" />
                                ))}
                            </div>
                        )}

                        {tagList.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2">
                                {tagList.map((tag: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, idx: Key | null | undefined) => (
                                    <Badge key={idx} variant="secondary">
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
