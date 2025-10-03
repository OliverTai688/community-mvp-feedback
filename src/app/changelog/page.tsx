import { prisma } from "@/lib/prisma"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"



export const revalidate = 0



export default async function ChangelogPage() {

  const items = await prisma.changelog.findMany({

    where: { published: true },

    orderBy: { createdAt: "desc" },

  })



  return (

    <div className="space-y-6">

      <h1 className="text-xl font-semibold tracking-tight">更新日誌</h1>

      <div className="space-y-4">

        {items.map((i) => (

          <Card key={i.id}>

            <CardHeader>

              <CardTitle className="flex flex-wrap items-center gap-2">

                <span>{i.title}</span>

                <span className="text-xs text-muted-foreground">

                  {i.createdAt.toLocaleDateString("zh-TW")}

                </span>

              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-3">

              <p className="whitespace-pre-wrap">{i.content}</p>

              <div className="flex flex-wrap gap-2">

                {i.tags.map((t, idx) => <Badge key={idx} variant="secondary">#{t}</Badge>)}

              </div>

            </CardContent>

          </Card>

        ))}

        {items.length === 0 && <p className="text-sm text-muted-foreground">尚無更新。</p>}

      </div>

    </div>

  )

}


