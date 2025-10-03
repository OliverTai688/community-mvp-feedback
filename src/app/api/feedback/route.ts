import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const { email, message, page, emoji } = await req.json()

  if (!message || message.trim().length < 3) {
    return NextResponse.json({ ok: false, error: "訊息至少 3 個字" }, { status: 400 })
  }

  await prisma.feedback.create({
    data: {
      email: email?.trim() || null,
      message: message.trim(),
      page: page?.trim() || null,
      emoji: emoji?.trim() || null,
    },
  })

  return NextResponse.json({ ok: true })
}
