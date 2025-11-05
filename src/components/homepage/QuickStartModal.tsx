"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type QuickStartModalProps = {
  title: string
  content: string
}

export function QuickStartModal({ title, content }: QuickStartModalProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem("quickstart-dismissed")
    if (!dismissed) {
      setOpen(true)
    }
  }, [])

  const handleClose = () => {
    setOpen(false)
    localStorage.setItem("quickstart-dismissed", "true")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-w-2xl bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden"
        onInteractOutside={handleClose}
      >
        {/* 🧭 移除左上角叉叉，只保留標題 */}
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100 text-center">
            {title}
          </DialogTitle>
        </DialogHeader>

        <DialogDescription asChild>
          <div
            className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed prose prose-slate dark:prose-invert max-h-[60vh] overflow-y-auto"
            dangerouslySetInnerHTML={{
              __html: content.replace(
                /<!DOCTYPE[^>]*>|<html[^>]*>|<\/html>|<head[^>]*>.*?<\/head>|<body[^>]*>|<\/body>/g,
                ""
              ),
            }}
          />
        </DialogDescription>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleClose} className="bg-blue-600 hover:bg-blue-700 text-white">
            開始探索 OneLink
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
