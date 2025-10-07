import "server-only"
import { prisma } from "@/lib/prisma"
import type { Changelog } from "@prisma/client"

// 伺服端查詢：回傳已發佈項目
export async function getChangelogs(): Promise<Changelog[]> {
  return prisma.changelog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  })
}
