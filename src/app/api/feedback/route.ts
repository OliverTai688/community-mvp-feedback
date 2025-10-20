 import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { email, message, page, emoji } = await req.json()

    if (!message || message.trim().length < 3) {
      return NextResponse.json({ ok: false, error: "訊息至少 3 個字" }, { status: 400 })
    }

    // ✅ 1️⃣ 儲存到資料庫
    await prisma.feedback.create({
      data: {
        email: email?.trim() || null,
        message: message.trim(),
        page: page?.trim() || null,
        emoji: emoji?.trim() || null,
      },
    })

    // ✅ 2️⃣ 寄信給管理者
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,      // 你的 Gmail 帳號
        pass: process.env.GMAIL_APP_PASS,  // Gmail 應用程式密碼（16 碼）
      },
    })

    const mailOptions = {
      from: `"Feedback Form" <${process.env.GMAIL_USER}>`,
      to: "taioliver688@gmail.com", // 📬 收件人信箱
      subject: `新的回饋訊息${email ? ` 來自 ${email}` : ""}`,
      html: `
        <h2>📬 收到新的回饋意見</h2>
        <p><strong>寄件人：</strong> ${email || "未提供"}</p>
        <p><strong>內容：</strong></p>
        <pre style="white-space:pre-wrap;font-family:sans-serif;">${message}</pre>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("❌ Feedback route error:", error)
    return NextResponse.json({ ok: false, error: "伺服器錯誤" }, { status: 500 })
  }
}
