import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export default async function ChangelogDetailPage({ params }: { params: { id: string } }) {
  const item = await prisma.changelog.findUnique({
    where: { id: params.id },
  })

  if (!item || !item.published) return notFound()

  return (
    <article className="prose dark:prose-invert max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
      <p className="text-sm text-muted-foreground mb-4">
        {new Date(item.createdAt).toLocaleString("zh-TW")}
      </p>

      {item.coverUrl && (
        <div className="relative w-full aspect-[16/9] mb-6 rounded-lg overflow-hidden">
          <Image src={item.coverUrl} alt={item.title} fill className="object-cover" />
        </div>
      )}

      <div
  className="prose dark:prose-invert max-w-none leading-relaxed"
  dangerouslySetInnerHTML={{ __html: item.content }}
/>


      {Array.isArray(item.images) && item.images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
          {item.images.map((url, idx) => (
            <a key={idx} href={url} target="_blank" rel="noopener noreferrer">
              <Image
                src={url}
                alt={`${item.title}-${idx}`}
                width={400}
                height={300}
                className="rounded-md hover:opacity-90 transition"
              />
            </a>
          ))}
        </div>
      )}

      {item.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8">
          {item.tags.map((t) => (
            <Badge key={t} variant="secondary">
              #{t}
            </Badge>
          ))}
        </div>
      )}
    </article>
  )
}
