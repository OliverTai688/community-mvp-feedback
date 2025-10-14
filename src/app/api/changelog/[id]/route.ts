import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const item = await prisma.changelog.findUnique({ where: { id } })
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const payload = (await req.json()) as {
      token?: string
      title?: string
      content?: string
      tags?: string
      coverUrl?: string
      images?: string
    }

    const adminToken = process.env.ADMIN_TOKEN
    const token = (payload.token || req.headers.get("x-admin-token")) ?? ""
    if (!adminToken || token !== adminToken)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

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

    const updated = await prisma.changelog.update({
      where: { id },
      data: { title, content, tags, coverUrl, images },
    })

    return NextResponse.json({ ok: true, id: updated.id })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const payload = (await req.json().catch(() => ({}))) as { token?: string }
    const adminToken = process.env.ADMIN_TOKEN
    const token = (payload.token || req.headers.get("x-admin-token")) ?? ""

    if (!adminToken || token !== adminToken)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await prisma.changelog.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
