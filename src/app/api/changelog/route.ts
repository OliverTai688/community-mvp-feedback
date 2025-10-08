import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/changelog?limit=20&cursor=<id>
 * - 回傳已發佈 changelog，含 coverUrl / images
 * - 分頁：回傳 nextCursor（用於下一頁）
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const limitParam = searchParams.get("limit")
  const cursor = searchParams.get("cursor")

  const limit = Math.max(1, Math.min(Number(limitParam ?? 20), 100))

  const rows = await prisma.changelog.findMany({
    where: { published: true },
    orderBy: [
      { createdAt: "desc" },
      { id: "desc" }, // 確保游標排序穩定
    ],
    take: limit + 1, // 多抓一筆來判斷是否還有下一頁
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
  })

  type Row = typeof rows[number]

  const hasMore = rows.length > limit
  const pageItems = hasMore ? rows.slice(0, limit) : rows

  const data = pageItems.map((r: Row) => ({
    id: r.id,
    title: r.title,
    content: r.content,
    tags: r.tags ?? [],
    coverUrl: r.coverUrl ?? null,
    images: r.images ?? [],
    published: r.published,
    createdAt: r.createdAt.toISOString(),
  }))

  const nextCursor = hasMore ? pageItems[pageItems.length - 1].id : null

  return NextResponse.json({ items: data, nextCursor })
}

/**
 * POST /api/changelog
 * Body:
 * {
 *   "title": string,
 *   "content": string,
 *   "tags"?: string[],
 *   "coverUrl"?: string | null,
 *   "images"?: string[],
 *   "published"?: boolean
 * }
 * 建議用 ADMIN_TOKEN 簡單防護（在 .env / Vercel 設定）
 */
export async function POST(req: NextRequest) {
  const header = req.headers.get("x-admin-token")
  if (!process.env.ADMIN_TOKEN || header !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => null) as {
    title?: string
    content?: string
    tags?: unknown
    coverUrl?: string | null
    images?: unknown
    published?: boolean
  } | null

  if (!body?.title?.trim() || !body?.content?.trim()) {
    return NextResponse.json({ ok: false, error: "缺少標題或內容" }, { status: 400 })
  }

  const normTags =
    Array.isArray(body.tags) ? body.tags.map(String).map((t) => t.trim()).filter(Boolean) : []

  const normImages =
    Array.isArray(body.images) ? body.images.map(String).map((u) => u.trim()).filter(Boolean) : []

  const row = await prisma.changelog.create({
    data: {
      title: body.title.trim(),
      content: body.content.trim(),
      tags: normTags,
      coverUrl: body.coverUrl?.trim() || null,
      images: normImages,
      published: body.published ?? true,
    },
  })

  return NextResponse.json({ ok: true, id: row.id }, { status: 201 })
}
