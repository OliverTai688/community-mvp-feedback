import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || ""
    let payload: any = {}

    if (contentType.includes("application/json")) {
      payload = await req.json()
    } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      const form = await req.formData()
      payload = Object.fromEntries(form as any)
    } else {
      return NextResponse.json({ error: "Unsupported Content-Type" }, { status: 415 })
    }

    const adminToken = process.env.ADMIN_TOKEN
    const token = (payload.token || req.headers.get("x-admin-token")) as string

    if (!adminToken || token !== adminToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const title = String(payload.title || "").trim()
    const content = String(payload.content || "").trim()
    const tags = String(payload.tags || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

    const coverUrl = String(payload.coverUrl || "").trim() || null
    const images = String(payload.images || "")
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
