import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const rows = await prisma.changelog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  })
  return NextResponse.json(rows)
}
