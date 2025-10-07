import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const rows = await prisma.changelog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  })

  // 用回傳型別自動推斷單筆資料型別，避免 any
  type Row = Awaited<ReturnType<typeof prisma.changelog.findMany>>[number]

  const data = rows.map((r: Row) => ({
    id: r.id,
    title: r.title,
    content: r.content,
    tags: r.tags, // String[]，可直接回傳
    createdAt: r.createdAt.toISOString(), // Date -> string
    published: r.published,
  }))

  return NextResponse.json(data)
}
