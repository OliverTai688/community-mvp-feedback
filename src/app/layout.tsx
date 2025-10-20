import type { Metadata } from "next"
import "./globals.css"
import Link from "next/link"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OneLink - 誠交專屬社群",
  description: "從社群出發打造專屬誠交俱樂部的AI生態",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className={inter.className}>
        <div className="min-h-dvh flex flex-col">
          <header className="border-b">
            <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
              <Link href="/" className="font-semibold tracking-tight">OneLink</Link>
              <nav className="flex gap-4 text-sm">
                <Link href="/changelog">更新日誌</Link>
                <Link href="/feedback">回饋</Link>
                <Link href="/community">社群</Link>
                <Link href="/about">關於</Link>
              </nav>
            </div>
          </header>
          <main className="flex-1">
            <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
          </main>
          <footer className="border-t">
            <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted-foreground">
              © {new Date().getFullYear()} OneLink. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
