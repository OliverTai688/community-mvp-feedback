import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type Payload = {
  token?: string
  title?: string
  content?: string
  tags?: string
  coverUrl?: string
  images?: string
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || ""
    let payload: Payload = {}

    if (contentType.includes("application/json")) {
      payload = (await req.json()) as Payload
    } else if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const form = await req.formData()
      const entries: Record<string, string> = {}
      for (const [key, value] of form.entries()) {
        if (typeof value === "string") {
          entries[key] = value
        }
      }
      payload = entries
    } else {
      return NextResponse.json({ error: "Unsupported Content-Type" }, { status: 415 })
    }

    const adminToken = process.env.ADMIN_TOKEN
    const token = (payload.token || req.headers.get("x-admin-token")) ?? ""

    if (!adminToken || token !== adminToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const title = (payload.title ?? "").trim()
    const content = (payload.content ?? "").trim()
    const tags = (payload.tags ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

    const coverUrl = payload.coverUrl?.trim() || null
    const images = (payload.images ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)

    if (!title || !content) {
      return NextResponse.json({ error: "缺少標題或內容" }, { status: 400 })
    }

    const created = await prisma.changelog.create({
      data: { title, content, tags, coverUrl, images, published: true },
      select: { id: true },
    })

    return NextResponse.json({ ok: true, id: created.id })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
