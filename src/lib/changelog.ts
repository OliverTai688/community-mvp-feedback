// src/lib/changelog.ts
import "server-only"
import { prisma } from "@/lib/prisma"

// 用 findMany 的回傳型別自動推斷單筆資料型別
type Row = Awaited<ReturnType<typeof prisma.changelog.findMany>>[number]
// print

// 伺服端查詢：回傳已發佈項目
export async function getChangelogs(): Promise<Row[]> {
  return prisma.changelog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  })
}
