import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const rows = await prisma.changelog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  })

  // 把 Date 轉成字串，Json (tags) 保留陣列
  const data = rows.map((r) => ({
    id: r.id,
    title: r.title,
    content: r.content,
    tags: Array.isArray(r.tags) ? r.tags : [],
    createdAt: r.createdAt.toISOString(),
  }))

  return NextResponse.json(data)
}
