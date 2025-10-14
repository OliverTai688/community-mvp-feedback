import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/changelog?limit=20&cursor=<id>&includeUnpublished=true
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const limitParam = searchParams.get("limit")
  const cursor = searchParams.get("cursor")
  const includeUnpublished = searchParams.get("includeUnpublished") === "true"
  const token = req.headers.get("x-admin-token")

  // 如果沒 token 或 token 不符，就只能看已發布
  const canSeeAll = !!token && token === process.env.ADMIN_TOKEN

  const limit = Math.max(1, Math.min(Number(limitParam ?? 20), 100))
  const rows = await prisma.changelog.findMany({
    where: canSeeAll && includeUnpublished ? {} : { published: true },
    orderBy: [
      { createdAt: "desc" },
      { id: "desc" },
    ],
    take: limit + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
  })

  const hasMore = rows.length > limit
  const pageItems = hasMore ? rows.slice(0, limit) : rows

  const data = pageItems.map((r) => ({
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
 * 需 header: x-admin-token
 */
export async function POST(req: NextRequest) {
  const header = req.headers.get("x-admin-token")
  if (!process.env.ADMIN_TOKEN || header !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  const body = (await req.json().catch(() => null)) as {
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

  const normTags = Array.isArray(body.tags)
    ? body.tags.map(String).map((t) => t.trim()).filter(Boolean)
    : []
  const normImages = Array.isArray(body.images)
    ? body.images.map(String).map((u) => u.trim()).filter(Boolean)
    : []

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
