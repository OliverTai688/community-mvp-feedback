import { prisma } from "@/lib/prisma"
import HeroMagic from "@/components/homepage/heromagic"
import FeaturesBento from "@/components/homepage/featuresbento"
import LatestChangelog from "@/components/homepage/latestchangelog"
import { QuickStartModal } from "@/components/homepage/QuickStartModal"
import { FAQSection } from "@/components/homepage/FAQsection"

export default async function HomePage() {
  // 取得所有 changelog 供底部展示
  const latest = await prisma.changelog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  })

  // ✅ 指定 OneLink 的誕生
  const oneLinkArticle = await prisma.changelog.findFirst({
    where: { title: "OneLink的誕生" }, // 注意：沒有空白
  })

  const items = latest.map((r) => ({
    id: r.id,
    title: r.title,
    content: r.content,
    createdAt: r.createdAt.toISOString(),
  }))

  return (
    <div className="relative space-y-6 sm:space-y-8 md:space-y-10">
      {/* 🔹 首次進入時彈出 OneLink 的誕生 */}
      {oneLinkArticle && (
        <QuickStartModal
          title={oneLinkArticle.title}
          content={oneLinkArticle.content}
        />
      )}

      <HeroMagic />
      <LatestChangelog items={items} />
      <FeaturesBento />
      <FAQSection /> 
    </div>
  )
}
