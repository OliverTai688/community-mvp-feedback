"use client"

import {
  ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react"
import { motion } from "framer-motion" // 建議用 framer-motion；若你確實用 motion/react 也可

import { cn } from "@/lib/utils"

export interface AnimatedGridPatternProps
  extends ComponentPropsWithoutRef<"svg"> {
  width?: number
  height?: number
  x?: number
  y?: number
  strokeDasharray?: number
  numSquares?: number
  maxOpacity?: number
  duration?: number
  /** 用於方塊動畫之間的重複延遲（不應該傳到 <svg>） */
  repeatDelay?: number
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0, // ← 從 props 拆出
  ...rest // ← 注意：不要把 repeatDelay 展開到 <svg>
}: AnimatedGridPatternProps) {
  const id = useId()
  const containerRef = useRef<SVGSVGElement | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [squares, setSquares] = useState<{ id: number; pos: [number, number] }[]>([])

  // 依據目前容器尺寸，計算網格座標
  const getPos = useCallback((): [number, number] => {
    return [
      Math.floor((Math.random() * dimensions.width) / width),
      Math.floor((Math.random() * dimensions.height) / height),
    ]
  }, [dimensions.width, dimensions.height, width, height])

  const generateSquares = useCallback(
    (count: number) =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        pos: getPos(),
      })),
    [getPos]
  )

  const updateSquarePosition = (id: number) => {
    setSquares((curr) =>
      curr.map((sq) => (sq.id === id ? { ...sq, pos: getPos() } : sq))
    )
  }

  // 初始化與尺寸改變時重新產生方塊
  useEffect(() => {
    setSquares(generateSquares(numSquares))
  }, [generateSquares, numSquares])

  // 監聽容器尺寸
  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    })
    const el = containerRef.current
    if (el) ro.observe(el)
    return () => {
      if (el) ro.unobserve(el)
      ro.disconnect()
    }
  }, [])

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className
      )}
      {...rest} // ← 不包含 repeatDelay
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${id})`} />

      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [cx, cy], id }, index) => (
          <motion.rect
            key={`${id}-${cx}-${cy}-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              // 無限來回（mirror） + 自定重複延遲
              repeat: Infinity,
              repeatType: "mirror",
              repeatDelay,
              // 每個方塊的初始延遲（交錯進場）
              delay: index * 0.08,
              ease: "easeInOut",
            }}
            onUpdate={() => {
              // 可選：在動畫更新過程中做其它效果
            }}
            onAnimationComplete={() => updateSquarePosition(id)}
            width={width - 1}
            height={height - 1}
            x={cx * width + 1}
            y={cy * height + 1}
            fill="currentColor"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  )
}
