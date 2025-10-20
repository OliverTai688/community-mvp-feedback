import { prisma } from "@/lib/prisma"
import HeroMagic from "@/components/homepage/heromagic"
import FeaturesBento from "@/components/homepage/featuresbento"
import LatestChangelog from "@/components/homepage/latestchangelog"

export default async function HomePage() {
  const latest = await prisma.changelog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  })
  // 序列化日期後傳給 Client
  const items = latest.map((r) => ({
    id: r.id,
    title: r.title,
    content: r.content,
    createdAt: r.createdAt.toISOString(),
  }))
  return (
    <div className="relative space-y-6 sm:space-y-8 md:space-y-10">
      <HeroMagic />
      <FeaturesBento />
      <LatestChangelog items={items} />
    </div>
  )

}
